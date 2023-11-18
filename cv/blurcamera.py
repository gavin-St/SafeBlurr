import time
import cv2 as cv
import mediapipe as mp
import numpy as np

mp_face_detection = mp.solutions.face_detection
cap = cv.VideoCapture(0)

with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detector:
    frame_counter = 0
    start_time = time.time()
    while True:
        frame_counter += 1
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        results = face_detector.process(rgb_frame)

        frame_height, frame_width, _ = frame.shape

        if results.detections:
            for face in results.detections:
                bboxC = face.location_data.relative_bounding_box
                x, y, w, h = int(bboxC.xmin * frame_width), int(bboxC.ymin * frame_height), \
                             int(bboxC.width * frame_width), int(bboxC.height * frame_height)

                x = max(0, x)
                y = max(0, y)
                w = min(frame_width - x, w)
                h = min(frame_height - y, h)

                face_area = frame[y:y + h, x:x + w]
                blurred_face = cv.GaussianBlur(face_area, (99, 99), 30)
                frame[y:y + h, x:x + w] = blurred_face
        
        fps = frame_counter / (time.time() - start_time)
        cv.putText(frame, f"FPS: {fps:.2f}", (30, 30), cv.FONT_HERSHEY_DUPLEX, 0.7, (0, 255, 255), 2)
        cv.imshow("frame", frame)

cap.release()
cv.destroyAllWindows()

