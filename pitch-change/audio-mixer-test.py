import librosa
import soundfile as sf

def pitch_shift(input_file, output_file, pitch_factor):
  y, sr = librosa.load(input_file, sr=None)
  y_shifted = librosa.effects.pitch_shift(y, n_steps=pitch_factor, sr=sr)

  sf.write(output_file, y_shifted, sr)

# Usage
pitch_shift('video_sound.mp3', 'pitch_shifted.mp3', -10)  # example: shift down by 2 semitones
