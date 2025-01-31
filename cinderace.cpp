#include "Pokemon.h"

int main() {
    Pokemon::Stats stats = {80, 116, 75, 65, 75, 119};
    vector<string> types = {"Fire"};
    vector<string> attacks = {"Pyro Ball", "Eletro Ball", "High Jump Kick", "Sucker Punch"};

    Pokemon Cinderace("Cinderace",types, attacks, stats);

    Cinderace.displayStats();
    Cinderace.displaySuperEffectives();
    Cinderace.displayWeaknesses();
    Cinderace.displayAttacks();

    return 0;
}
