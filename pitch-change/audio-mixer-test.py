from pydub import AudioSegment
from pydub.effects import pitch_shift

audio = AudioSegment.from_file("video_sound.mp3", format="mp3")

# Define the pitch shift factor (positive or negative)
pitch_factor = -3  # Adjust this value according to your preference

# Apply pitch shift
shifted_audio = pitch_shift(audio, pitch_factor)

# Save the modified audio
shifted_audio.export("output_file.mp3", format="mp3")