"""
calculateRating.py: Calculates the interaction score for each fiction based on the rating data.

Args:
    rating_dir (str): The URL or file path of the rating data.

Returns:
    pd.DataFrame: The calculated interaction scores.
"""

import pandas as pd
import io
import requests
import json

from sklearn.preprocessing import MinMaxScaler

def preprocess_rating(rating):
    """
    Preprocesses the rating data.

    Args:
        rating (pd.DataFrame): The rating data.

    Returns:
        pd.DataFrame: The preprocessed rating data.
    """
    rating['user_id'] = rating['user_id'].astype(str)
    rating['fiction_id'] = rating['fiction_id'].astype(str)
    rating['click'] = rating['click'].astype(int)
    rating['love'] = rating['love'].astype(int)
    rating['rating'] = rating['rating'].astype(float)
    return rating

def calculate_rating(rating):
    """
    Calculates the count_rating, mean_rating, love, click, and popularity based on fiction_id.

    Args:
        rating (pd.DataFrame): The rating data.

    Returns:
        pd.DataFrame: The calculated ratings.
    """
    fiction_recs = rating.groupby("fiction_id").rating.agg(['count','mean'])
    fiction_recs['fiction_id'] = fiction_recs.index
    fiction_recs['click'] = rating.groupby("fiction_id").click.agg(['count'])
    fiction_recs['love'] = rating.groupby("fiction_id").love.agg(['sum']) 
    fiction_recs['popularity'] = fiction_recs['click'] + fiction_recs['love']
    return fiction_recs

def calculate_weighted_mean(fiction_recs):
    """
    Calculates the weighted mean based on the count_rating, mean_rating, and popularity.

    Args:
        fiction_recs (pd.DataFrame): The calculated ratings.

    Returns:
        pd.Series: The weighted mean values.
    """
    r = fiction_recs['mean']
    v = fiction_recs['count']
    m = fiction_recs['count'].quantile(0.8)
    C = fiction_recs['mean'].mean()
    fiction_recs['weighted_mean'] = (r * v + C * m) / (v + m)
    return fiction_recs['weighted_mean']

def calculate_interaction(rating_dir ='https://readscape.live/fiction_ratings'):
    """
    Calculates the interaction score for each fiction based on the rating data.

    Args:
        rating_dir (str): The URL or file path of the rating data.

    Returns:
        pd.DataFrame: The calculated interaction.
    """
    response = requests.get(rating_dir)

        # Check if the request was successful (status code 200)
    if response.status_code == 200:
            # Parse the JSON data from the response
        json_data = response.json()

            # Extract the "data" part and create a DataFrame
        data_df = pd.read_json(json.dumps(json_data['data']))

            # Display the DataFrame
        print(data_df)
    else:
            # Print an error message if the request was not successful
        print(f"Error: {response.status_code}")

    data_df = preprocess_rating(data_df)
    fiction_recs = calculate_rating(data_df)
    fiction_recs['weighted_mean'] = calculate_weighted_mean(fiction_recs)
    selected_columns = ['fiction_id', 'count', 'mean', 'click', 'love', 'popularity', 'weighted_mean']
    fiction_recs_list = fiction_recs[selected_columns].to_dict(orient='records')

    # API endpoint URL
    api_url = "https://readscape.live/calculatedrating"

    # Convert the list of dictionaries to a JSON-formatted string
    fiction_recs_json = json.dumps(fiction_recs_list)

    # Post the JSON data
    response = requests.post(api_url, data=fiction_recs_json, headers={'Content-Type': 'application/json'})

    if response.status_code == 200:
        return print("Post successful!")
    else:
        return print(f"Failed to post data. Status code: {response.status_code}, Response text: {response.text}")

calculate_interaction()