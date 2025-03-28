#include <iostream>
#include <vector>
#include <algorithm>
#include <random>

using namespace std;


void startingHand(){
    random_device rd;
    mt19937 g(rd());
    vector<string> cartas = {
        // Pokemon Cards
        "Miraidon ex", "Miraidon ex", 
        "Regieleki VMAX", "Regieleki VMAX", 
        "Regieleki V", "Regieleki V", 
        "Regieleki", "Regieleki", 
        "Zeraora", "Zeraora", 
        "Bibarel", "Bibarel", 
        "Bidoof", "Bidoof",

        // Trainer Cards
        "Arven", "Arven", "Arven", "Arven", 
        "Boss’s Orders", "Boss’s Orders", 
        "Boss’s Orders", "Boss’s Orders", 
        "Professor’s Research", "Professor’s Research", 
        "Professor’s Research", "Professor’s Research", 
        "Electric Generator", "Electric Generator", "Electric Generator", "Electric Generator", 
        "Nest Ball", "Nest Ball", "Nest Ball", 
        "Switch", "Switch", 
        "Ultra Ball", "Ultra Ball", "Ultra Ball", "Ultra Ball", 
        "Forest Seal Stone", 
        "Leafy Camo Poncho", 
        "Vitality Band", "Vitality Band", 
        "Beach Court", "Beach Court", 

        // Energy Cards
        "Basic Lightning Energy", "Basic Lightning Energy", "Basic Lightning Energy", 
        "Basic Lightning Energy", "Basic Lightning Energy", "Basic Lightning Energy", 
        "Basic Lightning Energy", "Basic Lightning Energy", "Basic Lightning Energy", 
        "Basic Lightning Energy", "Basic Lightning Energy", "Basic Lightning Energy", 
        "Basic Lightning Energy", "Basic Lightning Energy", "Basic Lightning Energy"
    };
    shuffle(cartas.begin(), cartas.end(), g);
    for(int i = 0; i < 7 && i < cartas.size(); i++){
        cout << cartas[i] << endl;
    }
}

int main() {
    startingHand();
    return 0;
}