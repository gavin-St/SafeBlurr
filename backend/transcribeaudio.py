from google.cloud import speech, storage
from moviepy.editor import *
from moviepy.video.tools.subtitles import SubtitlesClip
import csv
import pandas as pd

def transcribe_audio(input_video_path):
    video = VideoFileClip(os.path.join("./", input_video_path))
    upload_blob(
        bucket_name="mhacks-video",
        source_file_name="video_sound.wav",
        destination_blob_name="video_sound.wav",
    )
    filepath = "gs://mhacks-video/video_sound.wav"
    transcribe_gcs_with_word_time_offsets(filepath)

    generator = lambda txt: TextClip(txt, font='Arial', fontsize=32, method='caption', color='white', bg_color='black')
    subs = []
    with open("transcript.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            word = row[0]
            start_time = row[1]
            end_time = row[2]
            subs.append(((float(start_time), float(end_time)), word))
    subtitles = SubtitlesClip(subs, generator)
    result = CompositeVideoClip([video, subtitles.set_pos(('center','bottom'))])

    result.write_videofile("output_video_final.mp4")
    return "output_video_final.mp4"

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

def transcribe_gcs_with_word_time_offsets(
    gcs_uri: str,
) -> speech.RecognizeResponse:
    # Transcribe the given audio file asynchronously and output the word time offsets.
    from google.cloud import speech

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        model="video",
        language_code="en-US",
        profanity_filter=True,
        enable_word_time_offsets=True,
        audio_channel_count = 2,
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    result = operation.result(timeout=90)

    f = open('transcript.csv', 'w')
    for result in result.results:
        alternative = result.alternatives[0]
        print(f"Transcript: {alternative.transcript}")
        print(f"Confidence: {alternative.confidence}")

        writer = csv.writer(f, lineterminator = '\n')
        for word_info in alternative.words:
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time
            # print([word, start_time.total_seconds(), end_time.total_seconds()])
            writer.writerow([word, start_time.total_seconds(), end_time.total_seconds()])
    f.close()
    return result