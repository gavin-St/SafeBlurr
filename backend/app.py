from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os
from blurvideo import *
from transcribeaudio import *

app = Flask(__name__)
CORS(app)
 
# set up temporary folder to hold the video
UPLOAD_FOLDER = 'tempuploads'
if not os.path.exists(UPLOAD_FOLDER):
  os.makedirs(UPLOAD_FOLDER)

@app.route("/")
def home():
  return "we are at MHacks!"

@app.route("/process", methods=['POST'])
def process():
  #print(request)
  if 'video' not in request.files:
    return "No video part in the request"

  video = request.files['video']

  if video.filename == '':
    return "No selected video"

  filename = os.path.join(UPLOAD_FOLDER, "video.mp4")
  video.save(filename)

  # start the video processing
  processed_filename = transcribe_audio(blur_video(filename))

  return send_from_directory(UPLOAD_FOLDER, processed_filename, as_attachment=True)

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=3000)
