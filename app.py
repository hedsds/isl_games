from flask import Flask, render_template, request, jsonify
import random
import os

app = Flask(__name__)

# Game Configuration
letters = 'abcdefghijklmnopqrstuvwxyz'
digits = '0123456789'
all_characters = list(letters + digits)

# Folder Path for Images
IMAGE_FOLDER = r"C:\Users\SRK\OneDrive\Desktop\DATA SET\GAMES 1"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_character")
def get_character():
    """Returns a random letter or digit with a standardized image path"""
    character = random.choice(all_characters)
    image_path = f"/static/images/{character}.jpg"

    if not os.path.exists(os.path.join(IMAGE_FOLDER, f"{character}.jpg")):
        image_path = "/static/images/placeholder.jpg"

    return jsonify({"character": character, "image": image_path})

@app.route("/check_input", methods=["POST"])
def check_input():
    """Checks if the user input matches the character"""
    data = request.json
    user_input = data.get("input", "").strip().lower()
    correct_character = data.get("character", "")

    if user_input == correct_character:
        return jsonify({"correct": True, "message": "Correct!"})
    else:
        return jsonify({"correct": False, "message": f"Wrong! The correct answer was {correct_character}"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
