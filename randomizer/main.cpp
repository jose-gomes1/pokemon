#include "rand.h"

int main() {
    system("clear || cls");
    // Load the Pokedex from file
    vector<Pokemon> pokedex = Pokemon::loadPokedex("pokedex.txt");

    // Get and display a truly random Pokémon each time
    cout << "=========================================================\n";
    Pokemon::getRandomPokemon(pokedex);
    Pokemon::getRandomPokemon(pokedex);
    Pokemon::getRandomPokemon(pokedex);
    cout << "=========================================================\n";

    return 0;
}
