from flask import Blueprint, render_template, request, redirect, url_for, flash, abort
from app import db, bcrypt
from app.forms import RegistrationForm, LoginForm, RecipeForm
from app.models import User, Recipe, Follow, Like, Comment
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.utils import secure_filename
import os

main = Blueprint('main', __name__)

@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    recipes_query = Recipe.query
    if search:
        recipes_query = recipes_query.filter(Recipe.title.contains(search) | Recipe.content.contains(search))
    recipes = recipes_query.paginate(page=page, per_page=10)
    return render_template('index.html', recipes=recipes.items, total_pages=recipes.pages, current_page=page)

@main.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created!', 'success')
        return redirect(url_for('main.home'))
    return render_template('signUp.html', form=form)

@main.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            flash('You have been logged in!', 'success')
            return redirect(url_for('main.home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', form=form)

@main.route("/logout")
@login_required
def logout():
    logout_user()
    flash('You have been logged out!', 'info')
    return redirect(url_for('main.home'))

@main.route("/recipe/new", methods=['GET', 'POST'])
@login_required
def new_recipe():
    form = RecipeForm()
    if form.validate_on_submit():
        filename = None
        if form.image.data:
            filename = secure_filename(form.image.data.filename)
            form.image.data.save(os.path.join('static/images', filename))
        recipe = Recipe(
            title=form.title.data, 
            content=form.content.data, 
            image_file=f'static/images/{filename}' if filename else None, 
            author=current_user
        )
        db.session.add(recipe)
        db.session.commit()
        flash('Your recipe has been created!', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_recipe.html', form=form, legend='New Recipe')

@main.route("/recipe/<int:recipe_id>")
def recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    return render_template('recipe.html', title=recipe.title, recipe=recipe)

@main.route("/recipe/<int:recipe_id>/update", methods=['GET', 'POST'])
@login_required
def update_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if recipe.author != current_user:
        abort(403)
    form = RecipeForm()
    if form.validate_on_submit():
        recipe.title = form.title.data
        recipe.content = form.content.data
        db.session.commit()
        flash('Your recipe has been updated!', 'success')
        return redirect(url_for('main.recipe', recipe_id=recipe.id))
    elif request.method == 'GET':
        form.title.data = recipe.title
        form.content.data = recipe.content
    return render_template('create_recipe.html', form=form, legend='Update Recipe')

@main.route("/recipe/<int:recipe_id>/delete", methods=['POST'])
@login_required
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if recipe.author != current_user:
        abort(403)
    db.session.delete(recipe)
    db.session.commit()
    flash('Your recipe has been deleted!', 'success')
    return redirect(url_for('main.home'))

@main.route("/user/<string:username>")
def user_recipes(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    recipes = Recipe.query.filter_by(author=user).paginate(page=page, per_page=10)
    return render_template('user_recipes.html', user=user, recipes=recipes.items, total_pages=recipes.pages, current_page=page)

@main.route("/recipe/<int:recipe_id>/comment", methods=['POST'])
@login_required
def comment_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    content = request.form['content']
    comment = Comment(content=content, author=current_user, recipe=recipe)
    db.session.add(comment)
    db.session.commit()
    flash('Your comment has been added!', 'success')
    return redirect(url_for('main.recipe', recipe_id=recipe.id))

@main.route("/recipe/<int:recipe_id>/like", methods=['POST'])
@login_required
def like_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if recipe.is_liked_by(current_user):
        flash('You have already liked this recipe', 'danger')
        return redirect(url_for('main.recipe', recipe_id=recipe.id))
    like = Like(user_id=current_user.id, recipe_id=recipe.id)
    db.session.add(like)
    db.session.commit()
    flash('Recipe liked!', 'success')
    return redirect(url_for('main.recipe', recipe_id=recipe.id))

@main.route("/follow/<string:username>", methods=['POST'])
@login_required
def follow(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        flash(f'User {username} not found.', 'danger')
        return redirect(url_for('main.home'))
    if user == current_user:
        flash('You cannot follow yourself!', 'danger')
        return redirect(url_for('main.user_recipes', username=username))
    current_user.follow(user)
    db.session.commit()
    flash(f'You are now following {username}!', 'success')
    return redirect(url_for('main.user_recipes', username=username))

@main.route("/unfollow/<string:username>", methods=['POST'])
@login_required
def unfollow(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        flash(f'User {username} not found.', 'danger')
        return redirect(url_for('main.home'))
    if user == current_user:
        flash('You cannot unfollow yourself!', 'danger')
        return redirect(url_for('main.user_recipes', username=username))
    current_user.unfollow(user)
    db.session.commit()
    flash(f'You have unfollowed {username}.', 'success')
    return redirect(url_for('main.user_recipes', username=username))

@main.route("/about")
def about():
    return render_template('about.html')

@main.route("/contact")
def contact():
    return render_template('contact.html')
