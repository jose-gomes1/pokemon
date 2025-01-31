#include "Pokemon.h"

int main() {
    Pokemon::Stats stats = {0, 0, 0, 0, 0, 0};
    vector<string> types = {"", ""};
    vector<string> attacks = {"", "", "", ""};

    Pokemon Pokemon("",types, attacks, stats);

    Pokemon.displayStats();
    Pokemon.displaySuperEffectives();
    Pokemon.displayWeaknesses();
    Pokemon.displayAttacks();

    return 0;
}
