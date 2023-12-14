import uuid
import requests
import random




API_ENDPOINT = 'https://readscape.live/fiction'

user_id = ["0d4db259-8ab0-11ee-8ba1-42010ab80003", "52cefee9-8ae8-11ee-8ba1-42010ab80003", "63088bb1-85dd-11ee-a0d6-42010ab80003", "7bdba0b4-8aeb-11ee-8ba1-42010ab80003", "9e8fca3c-8aeb-11ee-8ba1-42010ab80003", "b1200ad5-8ae9-11ee-8ba1-42010ab80003", "c4089372-8aeb-11ee-8ba1-42010ab80003", "e10fde78-8ae9-11ee-8ba1-42010ab80003"]

author_parts = ['Orion', 'Morgan', 'Alexander', 'Eva', 'David', 'Emily']
title_parts = ['Adventure', 'Mystery', 'Fantasy', 'Love', 'Secrets', 'Legacy']
synopsis_parts = ['A thrilling story about', 'In a world filled with', 'Discover the secrets of', 'A love story that transcends']
tags_parts = ['Adventure', 'Romance', 'Mystery', 'Fantasy', 'Sci-Fi']

def generate_dummy_data():
    return {
        "user_id": random.choice(user_id),  # Randomly select user_id from the predefined list
        "author": " ".join(random.choice(author_parts) for _ in range(random.randint(1, 2))),  # Randomize author name
        "title": " ".join(random.choice(title_parts) for _ in range(random.randint(1, 3))),   # Randomize title
        "synopsis": " ".join(random.choice(synopsis_parts) for _ in range(random.randint(1, 3))),  # Randomize synopsis
        "tags": "|".join(random.sample(tags_parts, random.randint(1, len(tags_parts)))),  # Randomize tags
        "chapters": random.randint(1, 10),
    }


def send_post_request(data):
    response = requests.post(API_ENDPOINT, json=data)
    return response


# Number of dummy records to create
num_records = 10

for _ in range(num_records):
    dummy_data = generate_dummy_data()
    # Send dummy data to the API
    response = send_post_request(dummy_data)

    # Print the response from the API
    print(response.text)