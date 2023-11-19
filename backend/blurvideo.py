import cv2 as cv
import mediapipe as mp
import numpy as np

def blur_video(input_video_path):
  mp_face_detection = mp.solutions.face_detection
  face_detector = mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.4)

  #test file
  cap = cv.VideoCapture(input_video_path)
  fps = cap.get(cv.CAP_PROP_FPS) 

  # define codec and create VideoWriter object
  fourcc = cv.VideoWriter_fourcc(*'mp4v') 
  output_video_path = 'output_video.mp4'
  out = cv.VideoWriter(output_video_path, fourcc, fps, (int(cap.get(3)), int(cap.get(4))))

  face_data = []
  frame_index = 0
  while cap.isOpened():
      ret, frame = cap.read()
      if not ret:
          break

      rgb_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
      results = face_detector.process(rgb_frame)

      frame_faces = []
      frame_height, frame_width, _ = frame.shape
      if results.detections:
          for face in results.detections:
              bboxC = face.location_data.relative_bounding_box
              x, y, w, h = int(bboxC.xmin * frame_width), int(bboxC.ymin * frame_height), \
                          int(bboxC.width * frame_width), int(bboxC.height * frame_height)

              # safety
              x = max(0, min(x, frame_width - 1))
              y = max(0, min(y, frame_height - 1))
              w = max(0, min(w, frame_width - x))
              h = max(0, min(h, frame_height - y))

              frame_faces.append((x, y, w, h))

      face_data.append((frame_index, frame_faces))
      frame_index += 1

  cap.release()

  # secondpass
  cap = cv.VideoCapture(input_video_path)
  frame_index = 0
  time_offset_frames = int(0.1 * fps)

  while cap.isOpened():
      ret, frame = cap.read()
      if not ret:
          break

      # Find which frame's face data to use based on the time offset
      offset_index = max(0, frame_index - time_offset_frames)
      for _, faces in face_data:
          if _ == offset_index:
              for (x, y, w, h) in faces:
                  face_area = frame[y:y + h, x:x + w]
                  blurred_face = cv.GaussianBlur(face_area, (99, 99), 30)
                  frame[y:y + h, x:x + w] = blurred_face
              break

      out.write(frame)
      frame_index += 1

  cap.release()
  out.release()
  cv.destroyAllWindows()
  return output_video_path
