import random

class Fakemon:
    def __init__(self, name, hp, attack, defense, speed, moves,):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.attack = attack
        self.defense = defense
        self.speed = speed
        self.moves = moves  # List of Move objects
        self.status = None
    
    def is_alive(self):
        return self.hp > 0
    
    def take_damage(self, damage):
        self.hp -= damage
        if self.hp < 0:
            self.hp = 0
    
    def apply_status(self, status, chance):
        if self.status is None and random.randint(1, 100) <= chance:
            self.status = status
            print(f"{self.name} is now {status}!")
    
    def __str__(self):
        return f"{self.name}: {self.hp}/{self.max_hp} HP ({self.status if self.status else 'No status'})"

class Move:
    def __init__(self, name, power, accuracy, priority=0, effect=None, status_effect=None, status_chance=0):
        self.name = name
        self.power = power
        self.accuracy = accuracy
        self.priority = priority  # Higher value means the move goes first
        self.effect = effect  # Function defining the move's effect
        self.status_effect = status_effect  # Status condition effect
        self.status_chance = status_chance  # Chance to apply status condition
    
    def use(self, attacker, target):
        if random.randint(1, 100) <= self.accuracy:
            damage = max(1, self.power + attacker.attack - target.defense)
            target.take_damage(damage)
            print(f"{attacker.name} used {self.name}! It dealt {damage} damage.")
            
            if self.effect:
                self.effect(attacker, target)
            
            if self.status_effect:
                target.apply_status(self.status_effect, self.status_chance)
        else:
            print(f"{attacker.name} used {self.name} but missed!")

def flinch_effect(attacker, target, chance=30):
    if random.randint(1, 100) <= chance:
        target.apply_status("Flinched", 100)
        print(f"{target.name} flinched and couldn't move!")

def burn_effect(attacker, target, chance):
    target.apply_status("Burned", chance)

def paralyze_effect(attacker, target, chance):
    target.apply_status("Paralyzed", chance)

def freeze_effect(attacker, target, chance):
    target.apply_status("Frozen", chance)

def poison_effect(attacker, target, chance):
    target.apply_status("Poisoned", chance)

def sleep_effect(attacker, target, chance):
    target.apply_status("Asleep", chance)

def confusion_effect(attacker, target, chance):
    target.apply_status("Confused", chance)

fakemon1 = Fakemon("Dracoflare", 100, 20, 10, 15, [
    Move("Flame Burst", 25, 90, status_effect="Burned", status_chance=10),
    Move("Tail Smash", 15, 95, effect=lambda a, t: flinch_effect(a, t, 20)),
    Move("Wing Cutter", 20, 85),
    Move("Fire Spin", 10, 100)
])

fakemon2 = Fakemon("Aqua Fang", 110, 18, 12, 14, [
    Move("Water Slash", 22, 90),
    Move("Aqua Jet", 18, 100, priority=1),
    Move("Bite", 15, 95, effect=lambda a, t: flinch_effect(a, t, 30)),
    Move("Hydro Pulse", 20, 80, effect=lambda a, t: paralyze_effect(a, t, 10))
])

def battle(fakemon1, fakemon2):
    print("Battle Start!")
    print(f"{fakemon1} vs {fakemon2}")
    
    while fakemon1.is_alive() and fakemon2.is_alive():
        print("\nChoose an action:")
        print(f"1. {fakemon1.moves[0].name} | 2. {fakemon1.moves[1].name} | 3. {fakemon1.moves[2].name} | 4. {fakemon1.moves[3].name}")
        move1 = fakemon1.moves[int(input("Player 1's move: ")) - 1]
        
        print(f"1. {fakemon2.moves[0].name} | 2. {fakemon2.moves[1].name} | 3. {fakemon2.moves[2].name} | 4. {fakemon2.moves[3].name}")
        move2 = fakemon2.moves[int(input("Player 2's move: ")) - 1]
        
        # Determine turn order based on priority and speed
        if move1.priority > move2.priority or (move1.priority == move2.priority and fakemon1.speed >= fakemon2.speed):
            move1.use(fakemon1, fakemon2)
            if fakemon2.is_alive() and fakemon2.status != "Flinched":
                move2.use(fakemon2, fakemon1)
        else:
            move2.use(fakemon2, fakemon1)
            if fakemon1.is_alive() and fakemon1.status != "Flinched":
                move1.use(fakemon1, fakemon2)
        
        print(f"{fakemon1} | {fakemon2}")
    
    if fakemon1.is_alive():
        print(f"{fakemon1.name} wins!")
    else:
        print(f"{fakemon2.name} wins!")

battle(fakemon1, fakemon2)
