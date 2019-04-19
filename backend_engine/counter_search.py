import pandas as pd
import numpy as np

# Load in data
pokedex = pd.read_csv('./data/pokedex.csv').drop(['Unnamed: 0'],axis=1)
weakness = pd.read_csv('./data/pokemon_weakness.csv').drop(['Unnamed: 0'],axis=1)

pokedex['Type_2'] = pokedex['Type_2'].replace('nan', np.nan).fillna(0)

# Objective of this function is to return best counter types based on input
def best_counter(type1, type2):
    
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
    
    return(best_counter)

# Objective of this function is to find best counter if user enters in pokemon name
def best_counter_pokemon(pokemon):
    
    t1 = pokedex[pokedex['Name']==pokemon.capitalize()]['Type_1'].tolist()[0]
    t2 = pokedex[pokedex['Name']==pokemon.capitalize()]['Type_2'].tolist()[0]
    counter = best_counter(t1,t2)
    
    return(counter)
