from pydub import AudioSegment
from pydub.playback import play
import os

# pip install pydub

file_path = "data/test-video.mp4"
if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
else:
    print("Yes")
    audio = AudioSegment.from_file(file_path, format="mp4")

    # Set the desired pitch shift factor (1.0 means no change)
    pitch_factor = 1.5  # Adjust as needed

    # Apply the pitch shift
    audio_pitch_shifted = audio._spawn(audio.raw_data, overrides={
        "frame_rate": int(audio.frame_rate * pitch_factor)
    })

    # Export the modified audio
    audio_pitch_shifted.export("output_pitch_shifted.mp3", format="mp3")
