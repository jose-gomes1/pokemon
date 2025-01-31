#include "Pokemon.h"

int main() {
    Pokemon::Stats stats = {105, 150, 90, 150, 90, 95};
    vector<string> types = {"Dragon", "Flying"};
    vector<string> attacks = {"Dragon Ascend", "Earthquake", "Extreme Speed", "Dragon Dance"};

    Pokemon Rayquaza("Rayquaza",types, attacks, stats);

    Rayquaza.displayStats();
    Rayquaza.displaySuperEffectives();
    Rayquaza.displayWeaknesses();
    Rayquaza.displayAttacks();

    return 0;
}
