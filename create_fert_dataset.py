import pandas as pd
import numpy as np
import random

# Seed for reproducibility
np.random.seed(42)

n_samples = 1000
data = []

fertilizers = [
    {"name": "Urea", "N": (80, 120), "P": (0, 20), "K": (0, 20), "pH": (6.5, 7.5), "temp": (20, 35), "hum": (50, 80)},
    {"name": "DAP", "N": (10, 30), "P": (40, 80), "K": (0, 20), "pH": (6.0, 7.0), "temp": (15, 30), "hum": (40, 70)},
    {"name": "MOP", "N": (0, 20), "P": (0, 20), "K": (40, 80), "pH": (6.0, 7.5), "temp": (20, 35), "hum": (50, 70)},
    {"name": "10-26-26", "N": (5, 15), "P": (20, 40), "K": (20, 40), "pH": (5.5, 7.0), "temp": (20, 30), "hum": (50, 75)},
    {"name": "14-35-14", "N": (10, 20), "P": (25, 45), "K": (10, 20), "pH": (6.0, 7.5), "temp": (25, 35), "hum": (55, 80)},
    {"name": "20-20", "N": (15, 25), "P": (15, 25), "K": (0, 10), "pH": (6.0, 7.0), "temp": (22, 32), "hum": (60, 80)},
    {"name": "28-28", "N": (20, 35), "P": (20, 35), "K": (0, 10), "pH": (6.5, 7.5), "temp": (20, 30), "hum": (50, 70)},
]

for _ in range(n_samples):
    fert = random.choice(fertilizers)
    n = np.random.uniform(*fert["N"])
    p = np.random.uniform(*fert["P"])
    k = np.random.uniform(*fert["K"])
    ph = np.random.uniform(*fert["pH"])
    temp = np.random.uniform(*fert["temp"])
    hum = np.random.uniform(*fert["hum"])
    label = fert["name"]
    data.append([n, p, k, ph, temp, hum, label])

df = pd.DataFrame(data, columns=["N", "P", "K", "pH", "Temperature", "Humidity", "Fertilizer"])
df.to_csv('public/datasets/fertilizer_prediction.csv', index=False)
