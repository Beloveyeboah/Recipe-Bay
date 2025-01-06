from flask import Blueprint, render_template, request, redirect, url_for, flash, abort, current_app
from app import db, bcrypt
from app.forms import RegistrationForm, LoginForm, RecipeForm, CommentForm
from app.models import User, Recipe, Follow, Like, Hate, Comment
from flask_login import login_user, current_user, logout_user, login_required, LoginManager
from werkzeug.utils import secure_filename
import os
from sqlalchemy import func

main = Blueprint('main', __name__)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.login_view = 'main.login'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    recipes_query = Recipe.query
    if search:
        recipes_query = recipes_query.filter(Recipe.title.contains(search) | Recipe.content.contains(search))
    
    featured_recipes = db.session.query(Recipe).outerjoin(Like).group_by(Recipe.id).order_by(func.count(Like.id).desc()).limit(5).all()
    
    recipes = recipes_query.paginate(page=page, per_page=10)
    return render_template('index.html', recipes=recipes.items, total_pages=recipes.pages, current_page=page, featured_recipes=featured_recipes)

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
        flash('Your account has been created! You can now log in.', 'success')
        return redirect(url_for('main.login'))
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
            next_page = request.args.get('next')
            flash('You have been logged in!', 'success')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
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
            # Ensure the uploads directory exists
            upload_dir = os.path.join(current_app.root_path, 'static/images/uploads')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
            form.image.data.save(os.path.join(upload_dir, filename))
        recipe = Recipe(
            title=form.title.data, 
            content=form.content.data, 
            image_file=f'static/images/uploads/{filename}' if filename else None, 
            author=current_user
        )
        db.session.add(recipe)
        db.session.commit()
        flash('Your recipe has been created!', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_recipe.html', form=form, legend='New Recipe')

@main.route("/recipe/<int:recipe_id>", methods=['GET', 'POST'])
def recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    form = CommentForm()
    if form.validate_on_submit():
        comment = Comment(content=form.comment.data, author=current_user, recipe_id=recipe.id)
        db.session.add(comment)
        db.session.commit()
        flash('Your comment has been added!', 'success')
        return redirect(url_for('main.recipe', recipe_id=recipe.id))
    return render_template('recipe.html', title=recipe.title, recipe=recipe, form=form)

@main.route("/recipe/<int:recipe_id>/like", methods=['POST'])
@login_required
def like_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if Like.query.filter_by(user_id=current_user.id, recipe_id=recipe_id).first():
        return abort(400, description="You have already liked this recipe.")
    like = Like(user_id=current_user.id, recipe_id=recipe_id)
    db.session.add(like)
    db.session.commit()
    return '', 200

@main.route("/recipe/<int:recipe_id>/hate", methods=['POST'])
@login_required
def hate_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if Hate.query.filter_by(user_id=current_user.id, recipe_id=recipe_id).first():
        return abort(400, description="You have already hated this recipe.")
    hate = Hate(user_id=current_user.id, recipe_id=recipe_id)
    db.session.add(hate)
    db.session.commit()
    return '', 200

@main.route("/follow/<int:user_id>", methods=['POST'])
@login_required
def follow_user(user_id):
    user = User.query.get_or_404(user_id)
    if Follow.query.filter_by(follower_id=current_user.id, followed_id=user_id).first():
        return abort(400, description="You are already following this user.")
    follow = Follow(follower_id=current_user.id, followed_id=user_id)
    db.session.add(follow)
    db.session.commit()
    return '', 200

@main.route("/recipe/<int:recipe_id>/add_comment", methods=['POST'])
@login_required
def add_comment(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    content = request.form['comment']
    comment = Comment(content=content, author=current_user, recipe_id=recipe.id)
    db.session.add(comment)
    db.session.commit()
    flash('Your comment has been added!', 'success')
    return redirect(url_for('main.recipe', recipe_id=recipe.id))

@main.route("/about")
def about():
    return render_template('about.html')

@main.route("/contact")
def contact():
    return render_template('contact.html')

@main.route("/all_recipes")
def all_recipes():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '')
    recipes_query = Recipe.query
    if search:
        recipes_query = recipes_query.filter(Recipe.title.contains(search) | Recipe.content.contains(search))
    
    recipes = recipes_query.paginate(page=page, per_page=10)
    return render_template('all_recipes.html', recipes=recipes.items, total_pages=recipes.pages, current_page=page)
