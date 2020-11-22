from matplotlib import pyplot as plt
from mtcnn import MTCNN
from numpy import asarray, array
from PIL import Image
from keras_vggface.utils import preprocess_input
from keras_vggface.vggface import VGGFace
from scipy.spatial.distance import cosine

imagesPath = '../../assets/images'

detector = MTCNN()

def extract_face_from_image(image_path, required_size=(224, 224)):
  # load image and detect faces
    image = plt.imread(image_path)
    detector = MTCNN()
    faces = detector.detect_faces(image)

    for face in faces:
        # extract the bounding box from the requested face
        x1, y1, width, height = face['box']
        x2, y2 = x1 + width, y1 + height

        # extract the face
        face_boundary = image[y1:y2, x1:x2]

        # resize pixels to the model size
        face_image = Image.fromarray(face_boundary)
        face_image = face_image.resize(required_size)
        face_array = asarray(face_image)

    return face_array

def get_model_scores(filenames):
    # extract faces
    samples = [extract_face_from_image(f) for f in filenames]

    # convert into array of samples
    samples = asarray(samples, 'float32')

    # prepare face for model, eg. center pixels
    samples = preprocess_input(samples, version=2)

    # create a vggface model
    model = VGGFace(model='resnet50', include_top=False,
	                input_shape=(224, 224, 3), pooling='avg')
    
    return model.predict(samples)


model_scores = get_model_scores([imagesPath + '/test1.jpg', imagesPath + '/Nathan.jpg'])

# determine if a candidate face is a match for a known face
# Common cut-off value used for face identity is between 0.4 and 0.6
# calculates the distance between two embeddings and interpreting the result
if cosine(model_scores[0], model_scores[1]) <= 0.4:
  print("Faces Matched")
else:
    print('Faces not matched')

