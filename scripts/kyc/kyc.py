from matplotlib import pyplot as plt
from mtcnn import MTCNN
from numpy import asarray, array
from PIL import Image
from keras_vggface.utils import preprocess_input
from keras_vggface.vggface import VGGFace
from scipy.spatial.distance import cosine
from random import randint, seed
import urllib.request
import argparse

imagesPath = '../../assets/images'
detector = MTCNN()
seed(1)
filename1 = randint(0, 1000)
filename2 = randint(1000, 2000)

parser = argparse.ArgumentParser(description="Code for face detection and comparison")
parser.add_argument('-selfie', '--selfie', help='Url to user selfie',
                    default='https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg')
parser.add_argument('-id', '--id', help="Url to id photo", default='https://media1.popsugar-assets.com/files/thumbor/UwqHyYaJbx0NSt4TrizsLEwVIyI/0x39:2509x2548/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/02/758/n/1922398/69895fd35e861d0df0e390.53702709_/i/Ryan-Reynolds.jpg')
args = vars(parser.parse_args())

def store_image(url, local_file_name):
  with urllib.request.urlopen(url) as resource:
    with open(local_file_name, 'wb') as f:
      f.write(resource.read())

store_image(args['selfie'], imagesPath + str(filename1))
store_image(args['id'], imagesPath + str(filename2))

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


model_scores = get_model_scores(
    [imagesPath + str(filename1), imagesPath + str(filename2)])

# determine if a candidate face is a match for a known face
# Common cut-off value used for face identity is between 0.4 and 0.6
# calculates the distance between two embeddings and interpreting the result
if cosine(model_scores[0], model_scores[1]) <= 0.5:
  print("Faces Matched")
else:
    print('Faces not matched')

