from google.cloud import speech, storage
from moviepy.editor import *
import csv
import pandas as pd
import cv2

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    print(
        "Downloaded storage object {} from bucket {} to local file {}.".format(
            source_blob_name, bucket_name, destination_file_name
        )
    )

def transcribe_gcs_with_word_time_offsets(
    gcs_uri: str,
) -> speech.RecognizeResponse:
    # Transcribe the given audio file asynchronously and output the word time offsets.
    from google.cloud import speech

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=16000,
        language_code="en-US",
        enable_word_time_offsets=True,
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    result = operation.result(timeout=90)

    for result in result.results:
        alternative = result.alternatives[0]
        print(f"Transcript: {alternative.transcript}")
        print(f"Confidence: {alternative.confidence}")

        f = open('transcript.csv', 'w')
        writer = csv.writer(f, lineterminator = '\n')
        for word_info in alternative.words:
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time
            # print([word, start_time.total_seconds(), end_time.total_seconds()])
            writer.writerow([word, start_time.total_seconds(), end_time.total_seconds()])
        f.close()
    return result

if __name__ == "__main__":
    download_blob(
        bucket_name="mhacks-video",
        source_blob_name="video.mp4",
        destination_file_name="video.mp4",
    )
    video = VideoFileClip(os.path.join("./","video.mp4"))
    video.audio.write_audiofile(os.path.join("./","video_sound.mp3"))
    upload_blob(
        bucket_name="mhacks-video",
        source_file_name="video_sound.mp3",
        destination_blob_name="video_sound.mp3",
    )
    filepath = "gs://mhacks-video/video_sound.mp3"
    transcribe_gcs_with_word_time_offsets(filepath)

    cap = cv2.VideoCapture('video.mp4')
    out = cv2.VideoWriter('output.mp4', -1, 20.0, (640,480))
    while(cap.isOpened()): 
        success, frame = cap.read() 
        if not success:
            break

        font = cv2.FONT_HERSHEY_SIMPLEX 
    
        # Use putText() method for 
        # inserting text on video 
        cv2.putText(frame,  
                    'TEXT ON VIDEO',  
                    (50, 50),  
                    font, 1,  
                    (0, 255, 255),  
                    2,  
                    cv2.LINE_4) 
        # Display the resulting frame 
        out.write(frame)
    
        # creating 'q' as the quit  
        # button for the video 
        if cv2.waitKey(1) & 0xFF == ord('q'): 
            break
    # release the cap object 
    cap.release()
    out.release()
    # close all windows 
    cv2.destroyAllWindows() 
