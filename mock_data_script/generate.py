import pandas as pd
import random
import namegenerator
import faker
from multiprocessing import Process
from numba import jit
import numpy as np


def generate_products():
    df = pd.read_csv('Movies.csv')
    df = df.drop('URL', axis=1)
    df = df.drop('MovieOrder', axis=1)
    df = df.drop('ProductOrder', axis=1)
    df = df.drop('Year', axis=1)
    df = df.drop('Month', axis=1)
    df = df.drop('Day', axis=1)
    df = df.drop('SingleDirector', axis=1)
    df = df.drop('Grade', axis=1)
    df = df.drop('Comments', axis=1)
    df = df.drop('Format', axis=1)
    df = df.drop('Actor', axis=1)
    df = df.drop('Time', axis=1)
    db_csv = df.drop('ReleaseTime', axis=1)
    db_csv.columns = ['p_name', 'p_id', 'p_category', 'price']
    print(db_csv.head())
    for idx, row in db_csv.iterrows():
        row['price'] = random.randint(1, 10)
        row['p_category'] = str(row['p_category']).split(',')[0]
        row['p_id'] = str(row['p_id'])
    db_csv['cost'] = db_csv.apply(lambda x: random.randint(1, x['price']), axis=1)
    for idx, row in db_csv.iterrows():
        if pd.isna(row['price']):
            print(row)
    db_csv = db_csv[['p_id', 'p_name', 'p_category', 'cost', 'price']]
    db_csv.to_csv('db.csv', index=False)


def generate_users():
    users = pd.DataFrame({
        'c_id': [],
        'c_name': [],
        'c_sex': []
    })
    user_id = random.randint(10000, 20000)
    for _ in range(20678):
        user = {
            'c_id': user_id,
            'c_name': namegenerator.gen(),
            'c_sex': random.randint(1, 2)
        }
        user_id += 1
        users.loc[len(users)] = user
    users = users.sample(frac=1)
    users.to_csv('users.csv', index=False)

def thread_generate_order_loop(t_id):
    savef_id = 0
    products = pd.read_csv('db2.csv')
    users    = pd.read_csv('users.csv')
    [oid, otime, num, cid, cname, csex, pid, pname, pcat, cost, price] = [[] for _ in range(11)]
    id_start = t_id * 1000000000
    for i in range(30000):
        product = products.loc[random.randint(0, len(products) - 1)]
        user = users.loc[random.randint(0, len(users) - 1)]
        oid.append(id_start)
        otime.append(faker.Faker().date(pattern='%Y-%m-%d'))
        num.append(random.randint(1, 50))
        cid.append(user['c_id'])
        cname.append(user['c_name'])
        csex.append(user['c_sex'])
        pid.append(product['p_id'])
        pname.append(product['p_name'])
        pcat.append(product['p_category'])
        cost.append(product['cost'])
        price.append(product['price'])
        if i > 0 and i % 1000 == 0:
            print(f'thread: {t_id}, i: {i}')
            dfi = pd.DataFrame({
                'o_id': oid,
                'o_time': otime,
                'num': num,
                'c_id': cid,
                'c_name': cname,
                'c_sex': csex,
                'p_id': pid,
                'p_name': pname,
                'p_category': pcat,
                'cost': cost,
                'price': price
            })
            dfi.to_csv(f'tmpframes/df{t_id}num{savef_id}.csv')
            savef_id += 1
            oid.clear()
            otime.clear()
            num.clear()
            cid.clear()
            cname.clear()
            csex.clear()
            pid.clear()
            pname.clear()
            pcat.clear()
            cost.clear()
            price.clear()
        id_start += 1


if __name__ == '__main__':
    for t_id in range(8):
        print('[Thread]:', t_id, ' begins')
        t = Process(target=thread_generate_order_loop, args=(t_id, ))
        t.start()