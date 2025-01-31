#ifndef RAND_H
#define RAND_H

#include <iostream>
#include <fstream>
#include <vector>
#include <random>
#include <sstream>

using namespace std;

class Pokemon {
private:
    int number;
    string name;
    string type1;
    string type2;

public:
    // Constructor
    Pokemon(int num, string n, string t1, string t2 = "")
        : number(num), name(n), type1(t1), type2(t2) {}

    // Static method to load the Pokémon list
    static vector<Pokemon> loadPokedex(const string& filename);

    // Method to randomly select and display a Pokémon
    static void getRandomPokemon(const vector<Pokemon>& pokedex);

    // Display function
    void display() const;
};

#endif
