from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request
import itertools
import random
import json
import multiprocessing
from flask import render_template
import pandas as pd
import numpy as np


application = Flask(__name__)
# app.debug = True


# Objective of this function is to return best counter types based on input
def best_counter(type1, type2):
    pokedex = pd.read_csv('data/pokedex.csv').drop(['Unnamed: 0'],axis=1)
    weakness = pd.read_csv('data/pokemon_weakness.csv').drop(['Unnamed: 0'],axis=1)

    pokedex['Type_2'] = pokedex['Type_2'].replace('nan', np.nan).fillna(0)
    # Finds types that are super-effective against input type
    counter1 = weakness[(weakness['Defense']==type1) & (weakness['Effect']=='super-effective')]['Attack'].tolist()
    
    # Finds types that have no effect or are not very effective to opponent type
    vunerable1 = weakness[(weakness['Defense']==type1) & 
                            ((weakness['Effect']=='no effect') | (weakness['Effect']=='not very effective'))]['Attack'].tolist()
        
    # If pokemon has a second type, we find what is super-effective against that as well
    if type2 != 0:
        counter2 = weakness[(weakness['Defense']==type2) & (weakness['Effect']=='super-effective')]['Attack'].tolist()
        
        vunerable2 = weakness[(weakness['Defense']==type2) & 
                              ((weakness['Effect']=='no effect') | (weakness['Effect']=='not very effective'))]['Attack'].tolist()
        
        best_counter = [x for x in counter1 if x not in vunerable2]
        best_counter.extend([x for x in counter2 if x not in vunerable1])
    
    else:
        best_counter = [x for x in counter1 if x not in vunerable1]
    
    return(list(set(best_counter)))

# Objective of this function is to find best counter if user enters in pokemon name
def best_counter_pokemon(pokemon):
    pokedex = pd.read_csv('data/pokedex.csv').drop(['Unnamed: 0'],axis=1)
    weakness = pd.read_csv('data/pokemon_weakness.csv').drop(['Unnamed: 0'],axis=1)

    pokedex['Type_2'] = pokedex['Type_2'].replace('nan', np.nan).fillna(0)
    t1 = pokedex[pokedex['Name']==pokemon.capitalize()]['Type_1'].tolist()[0]
    t2 = pokedex[pokedex['Name']==pokemon.capitalize()]['Type_2'].tolist()[0]
    
    counter = best_counter(t1,t2)

    return(counter)


# ----------------------- Routes -------------------------

@application.route('/')
@application.route('/index')
def index():
    return render_template('index.html',
                           title='Home')


@application.route('/best_counter_types', methods = ['POST'])
def return_best_type_counter():
    '''
    Returns counter types
    '''
    data = request.data
    dataDict = json.loads(data)
    # print(type(data))
    # print(type(dataDict))

    type1 = dataDict['type1']
    type2 = dataDict['type2']


    value_return = best_counter(type1, type2)
    return jsonify(value_return = value_return)



@application.route('/best_counter_pokemon', methods = ['POST'])
def return_best_counter():
    '''
    Returns counter
    '''
    data = request.data
    dataDict = json.loads(data)
    print(dataDict)
    pokemon = dataDict['pokemon']

    value_return = best_counter_pokemon(pokemon)
    return jsonify(value_return = value_return)


if __name__ == '__main__':
    CORS(application)
    print("FLASK STARTING")
    application.run(host = '0.0.0.0', port=5000, debug=True)
