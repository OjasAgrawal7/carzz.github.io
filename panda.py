import pandas as pd

# Load the CSV file
df = pd.read_csv('cars.csv')

# Initialize the last image URL variable
last_image_url = ''

# Iterate through the DataFrame rows
for index, row in df.iterrows():
    if pd.notna(row['car_name']):
        # If car_name is not empty, update last_image_url
        last_image_url = row['image']
    else:
        # If car_name is empty, assign the last_image_url
        df.at[index, 'image'] = last_image_url

# Save the updated DataFrame to a new CSV file
df.to_csv('updated_cars2.csv', index=False)

print("Image URLs have been adjusted and saved to 'updated_cars2.csv'.")
