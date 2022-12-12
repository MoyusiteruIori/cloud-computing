import os
from functools import reduce
import pandas as pd

if __name__ == '__main__':
    frame_names = [f'orders{n}.csv' for n in [1, 2, 3, 4]]
    frames = [pd.read_csv(f'{name}', index_col=False, encoding='ISO8859-1') for name in frame_names]
    df_merged = pd.concat(frames)
    df_merged.to_csv('orders.csv', index=False)