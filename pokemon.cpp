#include "Pokemon.h"

const float Pokemon::TYPE_CHART[18][18] = {
    // NORMAL, FIRE, WATER, GRASS, ELECTRIC, ICE, FIGHTING, POISON, GROUND, FLYING, PSYCHIC, BUG, ROCK, GHOST, DRAGON, DARK, STEEL, FAIRY
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1},  // Normal
    {1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1},  // Fire
    {1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1},  // Water
    {1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1},  // Grass
    {1, 1, 1, 2, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 0.5, 1},  // Electric
    {1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 0.5, 1},  // Ice
    {2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5},  // Fighting
    {1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2},  // Poison
    {1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1},  // Ground
    {1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1},  // Flying
    {1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1},  // Psychic
    {1, 0.5, 1, 2, 1, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5},  // Bug
    {1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1},  // Rock
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1},  // Ghost
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0},  // Dragon
    {1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5},  // Dark
    {1, 0.5, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2},  // Steel
    {1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1}   // Fairy
};

const map<string, int> Pokemon::TYPE_INDICES = {
    {"Normal", 0}, {"Fire", 1}, {"Water", 2}, {"Grass", 3}, {"Electric", 4},
    {"Ice", 5}, {"Fighting", 6}, {"Poison", 7}, {"Ground", 8}, {"Flying", 9},
    {"Psychic", 10}, {"Bug", 11}, {"Rock", 12}, {"Ghost", 13}, {"Dragon", 14},
    {"Dark", 15}, {"Steel", 16}, {"Fairy", 17}
};

Pokemon::Pokemon(string name, const vector<string>& types, const vector<string>& attacks, const Stats& ivs)
    : name(name), types(types), attacks(attacks), ivs(ivs) {
    superEffectives = calculateSuperEffectives(types);
}

vector<string> Pokemon::calculateSuperEffectives(const vector<string>& pokemonTypes) {
    vector<string> effectiveTypes;

    map<string, bool> alreadyAdded;

    for (const string& type : pokemonTypes) {
        if (TYPE_INDICES.find(type) == TYPE_INDICES.end()) continue;

        int typeIndex = TYPE_INDICES.at(type);

        for (const auto& [targetType, targetIndex] : TYPE_INDICES) {
            if (TYPE_CHART[typeIndex][targetIndex] > 1.0 && !alreadyAdded[targetType]) {
                effectiveTypes.push_back(targetType);
                alreadyAdded[targetType] = true;
            }
        }
    }

    return effectiveTypes;
}


void Pokemon::displayStats() const {
    cout << "======================" << endl;
    cout << "Name: " << name << endl;
    cout << "Types: ";
    for (size_t i = 0; i < types.size(); ++i) {
        cout << types[i];
        if (i < types.size() - 1) cout << ", ";
    }
    cout << endl;
    cout << "======================" << endl;
    cout << "\033[33mStats:\033[0m" << endl;
    cout << "  HP: " << ivs.hp << endl;
    cout << "  Attack: " << ivs.attack << endl;
    cout << "  Defense: " << ivs.defense << endl;
    cout << "  Special Attack: " << ivs.spAttack << endl;
    cout << "  Special Defense: " << ivs.spDefense << endl;
    cout << "  Speed: " << ivs.speed << endl;
    cout << "======================" << endl;
}

void Pokemon::displaySuperEffectives() const {
    cout << "\033[32mSuper Effective Against: \033[0m";
    for (size_t i = 0; i < superEffectives.size(); ++i) {
        cout << superEffectives[i];
        if (i < superEffectives.size() - 1) {
            cout << ", ";
        }
    }
    cout << endl;
    cout << "======================" << endl;
}

vector<string> Pokemon::calculateWeaknesses(const vector<string>& pokemonTypes) const {
    vector<string> weaknesses;
    map<string, bool> alreadyAdded;

    for (const string& type : pokemonTypes) {
        if (TYPE_INDICES.find(type) == TYPE_INDICES.end()) continue;

        int typeIndex = TYPE_INDICES.at(type);

        for (const auto& [attackingType, attackingIndex] : TYPE_INDICES) {
            if (TYPE_CHART[attackingIndex][typeIndex] > 1.0 && !alreadyAdded[attackingType]) {
                weaknesses.push_back(attackingType);
                alreadyAdded[attackingType] = true;
            }
        }
    }

    return weaknesses;
}


void Pokemon::displayWeaknesses() const {
    vector<string> weaknesses = calculateWeaknesses(types);
    cout << "\033[34mWeaknesses: \033[0m";
    for (size_t i = 0; i < weaknesses.size(); ++i) {
        cout << weaknesses[i];
        if (i < weaknesses.size() - 1) {
            cout << ", ";
        }
    }
    cout << endl;
    cout << "======================" << endl;
}

void Pokemon::displayAttacks() const {
    cout << "\033[31mAttacks: \033[0m";
    for (size_t i = 0; i < attacks.size(); ++i) {
        cout << attacks[i];
        if (i < attacks.size() - 1) {
            cout << ", ";
        }
    }
    cout << endl;
    cout << "======================" << endl;
}