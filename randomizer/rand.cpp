#include "rand.h"

vector<Pokemon> Pokemon::loadPokedex(const string& filename) {
    vector<Pokemon> pokedex;
    ifstream file(filename);
    
    if (!file) {
        cerr << "Error opening file: " << filename << endl;
        exit(1);
    }

    int number;
    string name, type1, type2;
    
    while (file >> number >> name >> type1) {
        string line;
        getline(file, line); // Read the rest of the line (in case there is a second type)
        istringstream iss(line);
        
        if (iss >> type2) {  // If a second type exists, read it
            pokedex.emplace_back(number, name, type1, type2);
        } else {  // Otherwise, store an empty second type
            pokedex.emplace_back(number, name, type1);
        }
    }

    file.close();
    return pokedex;
}

void Pokemon::getRandomPokemon(const vector<Pokemon>& pokedex) {
    if (pokedex.empty()) {
        cerr << "Error: Pokedex is empty!" << endl;
        return;
    }

    random_device rd;
    mt19937 gen(rd());  // Mersenne Twister PRNG seeded with a random device
    uniform_int_distribution<int> distrib(0, pokedex.size() - 1);  // Range 0 to size-1

    int index = distrib(gen);  // Generate a truly random index
    pokedex[index].display();
}

// Display the Pokémon details
void Pokemon::display() const {
    cout << "Selected Pokemon: #" << number << " " << name << " (" << type1;
    if (!type2.empty()) cout << "/" << type2;  // Only print if type2 exists
    cout << ")" << endl;
}
