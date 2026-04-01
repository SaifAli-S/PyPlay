from app import create_app
from extensions import db
from models.lesson import Lesson
from models.question import Question

app = create_app()

lessons = [
    {
        "title": "Introduction to Strings",
        "description": "Learn what strings are and how to use them in Python.",
        "order": 1,
        "xp_reward": 10,
        "content": """What are Strings?
A string is a sequence of characters enclosed in quotes.
In Python, you can use single quotes '' or double quotes "".

Example 1 — Basic string:
name = "Alice"
print(name)  # Output: Alice

Example 2 — String with single quotes:
greeting = 'Hello, World!'
print(greeting)  # Output: Hello, World!

Example 3 — Finding the length of a string:
word = "Python"
print(len(word))  # Output: 6

Example 4 — Accessing characters:
word = "Python"
print(word[0])  # Output: P
print(word[-1]) # Output: n"""
    },
    {
        "title": "String Methods",
        "description": "Explore powerful built-in string methods in Python.",
        "order": 2,
        "xp_reward": 15,
        "content": """String Methods
Python has many built-in methods to work with strings.

Example 1 — Uppercase and Lowercase:
text = "hello"
print(text.upper())  # Output: HELLO
print(text.lower())  # Output: hello

Example 2 — Strip whitespace:
text = "  hello  "
print(text.strip())  # Output: hello

Example 3 — Replace:
text = "I love Java"
print(text.replace("Java", "Python"))  # Output: I love Python

Example 4 — Split:
text = "apple,banana,cherry"
print(text.split(","))  # Output: ['apple', 'banana', 'cherry']"""
    },
    {
        "title": "Introduction to Lists",
        "description": "Learn how to store multiple values using lists.",
        "order": 3,
        "xp_reward": 15,
        "content": """What are Lists?
A list is a collection of items stored in a single variable.
Lists are ordered, changeable, and allow duplicate values.

Example 1 — Creating a list:
fruits = ["apple", "banana", "cherry"]
print(fruits)  # Output: ['apple', 'banana', 'cherry']

Example 2 — Accessing items:
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: cherry

Example 3 — Changing items:
fruits = ["apple", "banana", "cherry"]
fruits[1] = "mango"
print(fruits)  # Output: ['apple', 'mango', 'cherry']

Example 4 — Length of a list:
fruits = ["apple", "banana", "cherry"]
print(len(fruits))  # Output: 3"""
    },
    {
        "title": "List Methods",
        "description": "Learn how to manipulate lists using built-in methods.",
        "order": 4,
        "xp_reward": 20,
        "content": """List Methods
Python provides many useful methods to work with lists.

Example 1 — Append:
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)  # Output: ['apple', 'banana', 'cherry']

Example 2 — Remove:
fruits = ["apple", "banana", "cherry"]
fruits.remove("banana")
print(fruits)  # Output: ['apple', 'cherry']

Example 3 — Sort:
numbers = [3, 1, 4, 1, 5, 9]
numbers.sort()
print(numbers)  # Output: [1, 1, 3, 4, 5, 9]

Example 4 — Pop:
fruits = ["apple", "banana", "cherry"]
fruits.pop()
print(fruits)  # Output: ['apple', 'banana']"""
    },
    {
        "title": "Introduction to Dictionaries",
        "description": "Learn how to store data as key-value pairs.",
        "order": 5,
        "xp_reward": 20,
        "content": """What are Dictionaries?
A dictionary stores data as key-value pairs.
Keys must be unique. Values can be any data type.

Example 1 — Creating a dictionary:
person = {"name": "Alice", "age": 25}
print(person)  # Output: {'name': 'Alice', 'age': 25}

Example 2 — Accessing values:
person = {"name": "Alice", "age": 25}
print(person["name"])  # Output: Alice

Example 3 — Adding a new key:
person = {"name": "Alice"}
person["city"] = "Chennai"
print(person)  # Output: {'name': 'Alice', 'city': 'Chennai'}

Example 4 — Looping through a dictionary:
person = {"name": "Alice", "age": 25}
for key, value in person.items():
    print(key, ":", value)"""
    },
    {
        "title": "Introduction to Tuples",
        "description": "Learn about tuples — immutable sequences in Python.",
        "order": 6,
        "xp_reward": 20,
        "content": """What are Tuples?
A tuple is like a list but it cannot be changed after creation.
Tuples are written with round brackets ().

Example 1 — Creating a tuple:
colors = ("red", "green", "blue")
print(colors)  # Output: ('red', 'green', 'blue')

Example 2 — Accessing items:
colors = ("red", "green", "blue")
print(colors[0])  # Output: red

Example 3 — Tuple length:
colors = ("red", "green", "blue")
print(len(colors))  # Output: 3

Example 4 — Tuples are immutable:
colors = ("red", "green", "blue")
# colors[0] = "yellow"  # This would cause an error!
print("Tuples cannot be changed!")"""
    },
    {
        "title": "Introduction to Sets",
        "description": "Learn about sets — unordered collections with no duplicates.",
        "order": 7,
        "xp_reward": 20,
        "content": """What are Sets?
A set is an unordered collection with no duplicate values.
Sets are written with curly brackets {}.

Example 1 — Creating a set:
fruits = {"apple", "banana", "cherry"}
print(fruits)

Example 2 — No duplicates:
fruits = {"apple", "banana", "apple", "cherry"}
print(fruits)  # Output: {'apple', 'banana', 'cherry'}

Example 3 — Add to a set:
fruits = {"apple", "banana"}
fruits.add("cherry")
print(fruits)

Example 4 — Remove from a set:
fruits = {"apple", "banana", "cherry"}
fruits.remove("banana")
print(fruits)"""
    },
]

questions = [
    # Strings
    {"lesson_id": 1, "question": "Which of the following correctly creates a string in Python?", "option_a": "name = 123", "option_b": 'name = "Alice"', "option_c": "name = [Alice]", "option_d": "name = (Alice)", "correct": "b"},
    {"lesson_id": 1, "question": "What does len('Python') return?", "option_a": "5", "option_b": "7", "option_c": "6", "option_d": "4", "correct": "c"},
    # String Methods
    {"lesson_id": 2, "question": "What does 'hello'.upper() return?", "option_a": "hello", "option_b": "Hello", "option_c": "HELLO", "option_d": "HELLO!", "correct": "c"},
    {"lesson_id": 2, "question": "Which method removes whitespace from both ends of a string?", "option_a": "trim()", "option_b": "strip()", "option_c": "clean()", "option_d": "remove()", "correct": "b"},
    # Lists
    {"lesson_id": 3, "question": "How do you access the first item in a list called fruits?", "option_a": "fruits[1]", "option_b": "fruits(0)", "option_c": "fruits[0]", "option_d": "fruits.first()", "correct": "c"},
    {"lesson_id": 3, "question": "Which of the following creates a valid list?", "option_a": 'fruits = ("apple", "banana")', "option_b": 'fruits = ["apple", "banana"]', "option_c": 'fruits = {"apple", "banana"}', "option_d": 'fruits = "apple, banana"', "correct": "b"},
    # List Methods
    {"lesson_id": 4, "question": "Which method adds an item to the end of a list?", "option_a": "add()", "option_b": "insert()", "option_c": "append()", "option_d": "push()", "correct": "c"},
    {"lesson_id": 4, "question": "What does fruits.pop() do?", "option_a": "Adds an item", "option_b": "Removes the last item", "option_c": "Removes the first item", "option_d": "Clears the list", "correct": "b"},
    # Dictionaries
    {"lesson_id": 5, "question": "How do you access the value of 'name' in a dictionary called person?", "option_a": "person.name", "option_b": "person(name)", "option_c": "person['name']", "option_d": "person->name", "correct": "c"},
    {"lesson_id": 5, "question": "Which of the following correctly creates a dictionary?", "option_a": 'person = ["name", "Alice"]', "option_b": 'person = ("name", "Alice")', "option_c": 'person = {"name": "Alice"}', "option_d": 'person = "name: Alice"', "correct": "c"},
    # Tuples
    {"lesson_id": 6, "question": "Which of the following creates a tuple?", "option_a": 'colors = ["red", "green"]', "option_b": 'colors = {"red", "green"}', "option_c": 'colors = ("red", "green")', "option_d": 'colors = "red, green"', "correct": "c"},
    {"lesson_id": 6, "question": "What makes tuples different from lists?", "option_a": "Tuples are faster", "option_b": "Tuples cannot be changed", "option_c": "Tuples allow duplicates", "option_d": "Tuples use square brackets", "correct": "b"},
    # Sets
    {"lesson_id": 7, "question": "What is unique about sets in Python?", "option_a": "They are ordered", "option_b": "They allow duplicates", "option_c": "They have no duplicate values", "option_d": "They use square brackets", "correct": "c"},
    {"lesson_id": 7, "question": "Which method adds an item to a set?", "option_a": "append()", "option_b": "insert()", "option_c": "push()", "option_d": "add()", "correct": "d"},
]

with app.app_context():
    db.drop_all()
    db.create_all()

    for l in lessons:
        lesson = Lesson(**l)
        db.session.add(lesson)
    db.session.commit()

    for q in questions:
        question = Question(**q)
        db.session.add(question)
    db.session.commit()

    print(f"✅ Seeded {len(lessons)} lessons and {len(questions)} questions!")
    