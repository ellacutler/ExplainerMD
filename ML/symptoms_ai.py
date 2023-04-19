import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_personality():
  return f"""You are a health assistant.
    Given the symptoms that the user describes, 
    come up with possible medical condition and 
    what type of doctor can address it."""

def get_conditions(user_symptoms, temperature="0.5"):
  temperature=float(temperature)
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages = [
      {"role": "system", "content": generate_personality()},
      {"role": "user", "content": user_symptoms}
      ],
    temperature=temperature,
    top_p=1
    )
  conditions = response.choices[0].message.content
  return conditions