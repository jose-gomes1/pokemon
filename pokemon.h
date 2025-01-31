#ifndef POKEMON_H
#define POKEMON_H

#include <iostream>
#include <vector>
#include <map>

using namespace std;

class Pokemon {
private:
    static const int MAX_TYPES = 2;
    static const int MAX_ATTACKS = 4;

    string name;

    vector<string> types;
    vector<string> attacks;
    vector<string> superEffectives;


    static const float TYPE_CHART[18][18];
    static const map<string, int> TYPE_INDICES;
    vector<string> calculateSuperEffectives(const vector<string>& pokemonTypes);

public:
    struct Stats {
        int hp;
        int attack;
        int defense;
        int spAttack;
        int spDefense;
        int speed;
    } ivs;
    Pokemon(string name, const vector<string>& types, const vector<string>& attacks, const Stats& ivs);
    void displayStats() const;
    void displaySuperEffectives() const;
    vector<string>calculateWeaknesses(const vector<string>& pokemonTypes) const;
    void displayWeaknesses() const;
    void displayAttacks() const;
};

#endif
