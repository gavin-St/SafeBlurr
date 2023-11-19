import os
from pydub import AudioSegment
from pydub.playback import play


cwd = os.getcwd()

sound = AudioSegment.from_file("video_sound.mp3")

print(sound.frame_rate)

# shift the pitch down by half an octave (speed will decrease proportionally)
octaves = -0.2

new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))

lowpitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})

#Play pitch changed sound
lowpitch_sound.export("low-pitch.mp3", format="mp3")