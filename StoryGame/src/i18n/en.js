import bg from "../assets/forest_ground_angle.jpeg";
import crystalStream from "../assets/crystal_stream.jpeg";
import glowingGlade from "../assets/glowing_glade.jpeg";
import hollow from "../assets/hollow.webp";
import thornyMaze from "../assets/thorny_maze.jpeg";
import shrine from "../assets/shrine.jpeg";

export default {

  startStoryEvent: {
    text: "You awaken under a canopy of trees. The scent of damp earth fills your nose, and a faint golden light filters through the thick foliage. As you sit up, your head throbs with a dull ache, and you notice the pendant in your hand. It’s intricately carved, and the glow pulsates slightly, as if barely alive, like a dying ember. In the distance, the faint sound of whispers rises and falls like the rustling of leaves in the wind. You have no idea who you are, where you are, or why you’re here. The only certainty is the forest around you and the whispers that seem to be calling your name.",
    bg: bg,
    choices: [
      {
        text: "Investigate the pendant.",
        next: "investigatePendentStoryEvent"
      },
      {
        text: "Follow the whispers.",
        next: "followTheWhispersStoryEvent"
      }
    ]
  },


  investigatePendentStoryEvent: {
    text: "Look closely at the object in your hand, trying to understand its significance. The pendant glows brighter when pointed towards the right, in the direction of a dark thicket of trees leading deeper into the forest. To your left, you hear a steady stream of water. You can’t remember the last time you had something to drink.",
    bg: bg,
    choices: [
      {
        text: "Follow the glow from the pendent to the right",
        next: "followPendentToMazeStoryEvent"
      },
      {
        text: "Look for the stream to the left.",
        next: "lookForStreamStoryEvent"
      }
    ]
  },

  followTheWhispersStoryEvent: {
    text: "You listen closely to the whispers to try and decipher where they are coming from. You notice a pathway directly in front of you that seemingly appeared out of thin air. You start to follow it and the whispers grow louder; almost excited. The trail twists and turns through the undergrowth, deeper and deeper into the woods. You start to worry that you’ll never find your way out again. When you glance behind you at where the path once was, you are startled to discover that it has disappeared as quickly as it came. There’s no turning back now. You continue on and the path leads you to a hollow. A hill on your left and right obstruct your vision to the rest of the forest. Straight ahead there is an opening through the roots of an ancient tree. As you approach the opening, the whispers reach a crescendo. Suddenly the forgotten pendant springs to life. You can feel it pulling you away from the tree and the whispers.",
    bg: hollow,
    choices: [
      {
        text: "Follow the whispers into the hollowed out tree",
        next: "followWhispersIntoTreeStoryEvent"
      },
      {
        text: "Follow pendant",
        next: "followPendentStupidDeathStoryEvent"
      }
    ]
  },

  followPendentToMazeStoryEvent: {
    text: "You turn towards the thicket and the pendant starts to glow a fiery-orange. You’re not sure why, but this comforts you in a warm nostalgic sort of way. As you venture deeper, the air grows colder, and the ground becomes uneven. You reach a tangled maze of thorn-covered vines that pulse faintly, almost as if they are alive. The whispers grow louder, overlapping into incomprehensible murmurs, and the pendant begins to vibrate slightly in your hand, moreso when held in different directions.",
    bg: thornyMaze,
    choices: [
      {
        text: "Use the pendant to navigate through the maze.",
        next: "useThePendantToDieInTheMazeStoryEvent"
      },
      {
        text: "Attempt to cut through the vines.",
        next: "cutThroughVinesStoryEvent"
      }
    ]
  },

  useThePendantToDieInTheMazeStoryEvent: {
    text: "You look down at the pendant as you enter the maze. You start making turns left and right as if an invisible force is pulling you in. You have no idea how long you’ve been walking, but somehow you know you are on the right path. Suddenly you see a faint glow at the end of a long prickly corridor. You break into a frantic run towards freedom. Suddenly the vines spring to life. They begin wrapping around your limbs, thorns pierce your flesh. You struggle to free yourself but it’s already too late. You’ve already relinquished yourself to the forest. Maybe it’s better this way. ",
    bg: crystalStream,
    choices: [] // dead
  },

  lookForStreamStoryEvent: {
    text: "You follow the sounds of water, and eventually come across a winding stream  that glows faintly under the moonlight. The whispers fade here, replaced by a soothing melody.",
    bg: crystalStream,
    choices: [
      {
        text: "Drink from the stream.",
        next: "drinkStoryEvent"
      },
      {
        text: "Follow the melody.",
        next: "followMelodyStoryEvent"
      }
    ]
  },

  followWhispersIntoTreeStoryEvent: {
    text: "As you approach the tree the whispers suddenly stop. When you enter the hollowed out roots you discover a tunnel descending down deep into the earth. When you reach the bottom you find a tall slender hooded figure. It begins to tell you of an evil fire breathing goblin by the name of Aillén Mac Midgna. The figure tells you that the goblin has been trapped for centuries by the Sidhe, but it has been slowly regaining its power. You learn that no one has been able to kill Aillén Mac Midgna because as soon as he plays his harp, you’ll be put into a deep sleep. If you inhale poison, it will keep you awake long enough to get near him without falling asleep, but all who have tried have perished from the poison before carrying out the task of slaying the goblin. The figure tells you of a prophecy of a half human, half Sidhe that will have the power to slay Aillén Mac Midgna. The figure claims that the prophecy is talking about you, but you can hear the uncertainty in its voice. They continue to tell you that you must go to the glowing glade, find the goblin’s fiery heart, and stab it. You start to leave and you hear the figure whispering a warning that if anyone other than the halfling that the prophecy spoke about attempts to stab the heart, the dagger will instead pierce their own heart. You emerge from the tunnel with your head spinning. You wonder how the prophecy could possibly be talking about you when both your parents are human.",
    bg: bg,
    choices: [
      {
        text: "Go to the glade.",
        next: "goToGladeGoodEndingStoryEvent"
      },
      {
        text: "Run away",
        next: "escapeEndingStoryEvent"
      }
    ]
  },

  escapeEndingStoryEvent: {
    text: "Something seems off about this place. You scan your surroundings looking for the best place to go. You vaguely remember hearing from someone who must have been important to you at one time that if you ever get lost, just walk towards the east. You spot a place where the trees look thinner. Maybe if there were less trees around you, you could see which direction the sun is. You decide to take your chances and make a break for it. Your plan works; you find the sun and you start walking directly away from it. You keep walking. And walking. And walking. And walking. You forget how long you’ve been walking for. You look down at your hands that were once young and strong to see your flesh wrinkled and withered away. There is no escape.",
    bg: bg,
    choices: [] // death
  },

  followPendentStupidDeathStoryEvent: {
    text: "You’ve followed those whispers long enough. You don’t care enough to find out who’s making them even though it’s literally just right there. It’s time to put your fate into someone else’s hands. You follow the pull of the pendant up the hill, and out of the hollow. You start to wonder if the hill was always this steep. Right as you’re about to reach the top you lose your footing. You start wildly tumbling down the hill, picking up speed as you go. The back of your head slams against a rock that seemed to have magically appeared in your path. As you reach the bottom of the hollow your eyes are already glazed over as a steady drip of blood pools under your limp head.",
    bg: hollow,
    choices: [] // death
  },

  cutThroughVinesStoryEvent: {
    text: "You rip, pull, and tear at the vines with your hands. They writhe and emit a strange shriek. The vines retreat and reveal a hidden alcove with a faded carving on a large stone of what looks like a map of the forest. At the very center lies a ruin with strange symbols etched inside it. You pull out the pendant and hold it up to the map. Just as you suspected, the symbols are an exact match. Once again the pendant begins to emit a pleasant faint glow. Previously shrouded in shadow, the dim light from the pendant reveals a cryptic  message at the bottom of the stone. \"Bound by roots and guarded by stone, The heart of the forest is not its own. Break the seal, and the whispers shall cease. But beware, for freedom is no herald of peace.\" No longer focused on the map, you realize that the whispers have grown louder, and much more urgent. As you listen closer you’re startled to discover just how frightened they sound.",
    bg: thornyMaze,
    choices: [
      {
        text: "Follow the map to the ruins.",
        next: "openDoorWithPendentStoryEvent"
      },
      {
        text: "Follow the whispers.",
        next: "followTheWhispersStoryEvent"
      }
    ]
  },

  drinkStoryEvent: {
    text: "The water tastes so good. Better than any water you’ve ever had. And you’ve been so thirsty.",
    bg: bg,
    choices: [
      {
        text: "Drink more water.",
        next: "drinkMoreStoryEvent"
      },
      {
        text: "Explore the area.",
        next: "exploreStreamAreaStoryEvent"
      }
    ]
  },

  followMelodyStoryEvent: {
    text: "Since embarking on the current path, the pendant seemed to buzz with excitement; its soft glow growing to a warm blaze. As you journey deeper into the heart of the forest, the whispers have long since gone silent. You start to smell a noxiously medicinal, strangely sweet scent. The sheer strength of it almost knocks you off your feet. As you struggle to force oxygen into your lungs, you suddenly hear it. Ethereal harp music that seems to be at the cusp of transporting you into a dream. You continue walking as if in a trance until you reach the ruins. You come upon what looks like an outline of a door etched on the face of the stone ruin. The door is covered with outlines of strange markings. At the very center there is a small divot that looks as though something might fit inside. You pull out the pendant and hold it up to the empty space and the music stops as though waiting with bated breath.",
    bg: bg,
    choices: [
      {
        text: "Place the pendant in the hole.",
        next: "openDoorWithPendentStoryEvent"
      },
      {
        text: "Run away.",
        next: "escapeEndingStoryEvent"
      }
    ]
  },

  goToGladeGoodEndingStoryEvent: {
    text: "You decide that even if you’re not the person in the prophecy, you still have to try. You make it to the glade and are amazed by how blindingly beautiful it is. You walk towards the heart of the glade to find the blinding light that is emanating from the goblin’s heart in the center of a stone table. You take the dagger given to you by the hooded figure and stab it into the fiery pulsating heart. In the far distance you hear a deafening shriek that reminds you of a squealing tea kettle. The moment the horrible din subsides the forest explodes with the sounds of life. The forest is saved from the threat of destruction now that the fire goblin has been vanquished.",
    bg: glowingGlade,
    choices: [] // ending
  },

  followMapToRuinsStoryEvent: {
    text: "You push forward, forgetting about the visceral fear you could hear in those small voices. They’re not your problem, and anyway, there’s a job to be done. You have a very vague idea of how to follow the map, but any hesitation or doubt is extinguished by the sight of the pendant’s determination. Since embarking on the current path, the pendant seemed to buzz with excitement; its soft glow growing to a warm blaze. As you journey deeper into the heart of the forest, the whispers have long since gone silent. You start to smell a noxiously medicinal, strangely sweet scent. The sheer strength of it almost knocks you off your feet. As you struggle to force oxygen into your lungs, you suddenly hear it. Ethereal harp music that seems to be at the cusp of transporting you into a dream. You continue walking as if in a trance until you reach the ruins. You come upon what looks like an outline of a door etched on the face of the stone ruin. The door is covered with outlines of strange markings. At the very center there is a small divot that looks as though something might fit inside. You pull out the pendant and hold it up to the empty space and the music stops as though waiting with bated breath.",
    bg: bg,
    choices: [
      {
        text: "Place the pendant in the hole.",
        next: "openDoorWithPendentStoryEvent"
      },
      {
        text: "Run away.",
        next: "escapeEndingStoryEvent"
      }
    ]
  },

  drinkMoreStoryEvent: {
    text: "As you drink more, the cold water feels impossibly smooth. What was at first refreshing, soon becomes uncomfortably cold. You feel an unnervingly sharp pain in your stomach, your head begins to pound, and your vision blurs. You turn for support from a nearby tree. As you find your balance, you see a towering figure, unnaturally tall, his crooked frame blending with the jagged branches above. He steps towards you, close enough now to make out his face through the blurriness. Not a face. A Mask that writhes with shifting patterns. You fall backwards into the water. In a panic, you scramble to your feet and run. Not stopping until you’re completely out of breath. Completely disoriented, and with the pains in your stomach growing more cruel and sharp, you have no choice but to slow down. You’ve noticed the melody near the stream is gone. The whispers of the forest still gone as well. Night falls suddenly and the oppressive silence is replaced by far more unsettling sounds. You hear guttural, unnatural clicking, and low reverberating growls in the distance. The total darkness suffocates your senses, as eyes glint faintly in the distance, reflecting the dim light like shards of glass. Shapes move just beyond the edge of your vision, quick and silent, only to vanish when you turn your head. The sounds around you crescendo into chaos in an instant and knock you forward onto the ground as a searing pain erupts in the back of your shoulders — a sudden, brutal strike. Reacting is impossible. The growls vibrate your skull, but the sound is drowned out by the wet, sickening noise of each next unrelenting blow to the back of your head. It isn't long before you lose consciousness. A sweet relief from the fate that awaited you. You’ve relinquished yourself to the forest. Maybe it’s better this way.",
    bg: bg,
    choices: [] // death
  },

  exploreStreamAreaStoryEvent: {
    text: "You stand back up. Feeling a little dizzy. You look around and are startled by a tall masked man. He stands over you. He’s got to be at least 9 feet tall. He speaks in a low rhythmic voice. \"Seek the light where the shadows fall, A song that beckons through the forest's thrall. In the heart of stillness, truth shall be laid, Forgiveness blooms within the glade.\" As the creature's song concludes, the air around him begins to shimmer faintly, as if the very fabric of reality is bending. A low hum builds, resonating deep in your chest. Then, without warning, he dissolves into a cascade of faint, glowing embers, each ember flickering briefly before being swept away by an invisible breeze. The melody from before is still there, ever looming, filling with longing and dred.",
    bg: bg,
    choices: [
      {
        text: "Follow melody",
        next: "followMelodyNeutralEnding"
      },
      {
        text: "Ignore Melody",
        next: "ignoreMelodyStoryEvent"
      }
    ]
  },

  followMelodyNeutralEnding: {
    text: "You notice that the melody seems to be coming from two different directions. You get a bad feeling about one of the songs and instead follow the other. You keep going and eventually arrive at a beautiful glowing glade. In the center, you find a stone table with a beating heart that is engulfed in flames. You feel as though you’re supposed to do something here but you don’t know what. You sit down and fall into a deep sleep. Years pass and you’re still rooted in that spot, stuck in an endless slumber. You become a part of the forest. Maybe it’s better this way.",
    bg: bg,
    choices: [] // assimulation ending
  },

  openDoorWithPendentStoryEvent: {
    text: "The pendant clicks into place and the symbols on the door glow an ominous red. The stone door makes a deafening creak and swings open with a plume of dust. You take a few steps back and furiously rub the dust from your eyes. When your eyes come back into focus you see a dark humanoid creator with piercing red eyes looming over you. It looks at you curiously as it brushes its limp stringy hair behind a pointed ear. You notice for the first time that the creature is holding a miniature harp. The creature smiles menacingly when it sees your eyes fall on the instrument.  The smile still lingers on his lips, yet all traces are gone from his eyes as he begins to play. He plays for a minute and his expression turns from amusement to confusion to rage. As you are frozen in fear, you begin to notice all of the creatures in the forest have gone silent. You look around and see sleeping creatures littering the forest floor. You look back at the creature and he gives you a smirk before he opens his mouth and fire rushes out, quickly engulfing the entire forest and all of its sleeping inhabitants. You are reminded of that strange scent from when you approached the ruins, and you wonder why you could not at least be asleep too as you slowly burn alive.",
    bg: shrine,
    choices: [] // death
  },

  ignoreMelodyStoryEvent: {
    text: "You want nothing to do with this crazy forest and its weird songs. You decide to take your chances and make a break for it. You start to run but you trip over a tree root and fall into the stream. You hit your head on a rock, and your last thought before drifting to the bottom is this water is definitely too deep to be a stream.",
    bg: bg,
    choices: [] // death
  },

}