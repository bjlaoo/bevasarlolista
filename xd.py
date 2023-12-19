def treasure():
  print("\nYou are now in a treasure room!")
  print("And there is a door too!")
  print("What would you do? (1 or 2)")
  print("1). Take treasure and go through the door.")
  print("2). Just go through the door.")
  
  answer = input(">")
  
  
  if answer == "1":
    
    # Player is dead, call game_over() function with the "reason" argument
    game_over("Treasure is not real,and i will make you die!")
  
  elif answer == "2":
    
    # Player won the game
    print("\n Congrats you win the game!")
    
    # Activates play_again() function
    play_again()
  else:
    
    # Calls game_over() with "reason" argument
    game_over("Enter a Number Dude!!")


# snake room
def snake_room():
  print("\nThere are snakes here.")
  print("Behind the snake is another door.")
  print("Snakes are sleeping!")
  print("What would you do? (1 or 2)")
  print("1). Disturb them.")
  print("2).  You go without making noise.")

  answer = input(">")
  
  
  if answer == "1":
    game_over("Snakes will kill you.")
  
  elif answer == "2":
    
    # Player can go to Tresure Room
    print("\n Good choice,You can go out through door now!")
    treasure()
  else:
    
    # Calls game_over() function with the "reason" argument
    game_over("Enter a Number Dude!!")


# monster room
def monster_room():
  print("\nNow you entered the room of a monster!")
  print("The monster is sleeping.\nBehind the monster, there is another door. What would you do? (1 or 2)")
  print("1). Go through the door silently.")
  print("2).Be Brave, Kill the monster and show your courage!")

 
  answer = input(">")
  
  if answer == "1":
    
    # Player can go to Tresure Room
    treasure()
  elif answer == "2":
    game_over("The monster was hungry, he/it ate you.")
  
  else:
    
    # Calls game_over() function with the "reason" argument
    game_over("Enter a Number Dude!!.")


def play_again():
  print("\nDo you want to play again? (y or n)")
  answer = input(">").lower()

  if "y" in answer:
    
    # If player typed "yes" or "y" start the game from the beginning
    start()
  else:
    
     # If user types anything besides "yes" or "y", exit() the Game
    exit()

def game_over(reason):
  print("\n" + reason)
  print("Game Over!")
  play_again()
def start():
  print("\nYou are standing in a dark room.")
  print("There is a door to your left and right, which one do you take? (l or r)")
  
  
  answer = input(">").lower()

 
  if "l" in answer:
     
     # If player typed "left" or "l" lead him/her to Snake_room()
    snake_room()
  elif "r" in answer:
     
     #If player typed "right" or "r" lead him/her to monster_room()
    monster_room()
  else:
    
    #Calls game_over() function with the "reason" argument
    game_over("Enter a Number properly?")



# start the game
start()