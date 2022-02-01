# **Algorithm Part**

## **How to run the project**

> **This project is implemented with Python3. Make sure you have Python3 installed in your machine.**

1. Open Terminal and change directory to `<repository_root>/algo` .

2. Run the code file `index.py` within the directory with Python3. You may follow the command below.

    > `python index.py`
    >
    > *or some of you may need to use `python3` command*
    >
    > `python3 index.py`

3. Once the program is run, it will ask you to type the inputs.
    * The program will ask you to input a word list. To add a word list, type multiple words separated by white space as the example below, then hit enter.
        > ab bc cd
    * After you input word list, the program will ask you to input target word, type your target word as the example below, then hit enter.
        > abcd

4. The program will solve the inputs and print the answer. Once the answer is printed, the program terminates.

## **Algorithm Explanation**

Two words that can be combined to the target word. This means a word in a word list must be head-part or tail-part, so we create array for a possible word to be a head part or a tail part which has length as long as target word's length.

    target_length = len(target)

    head_list = [False] * (target_length + 1)
    tail_list = [False] * (target_length + 1)

Then we iterate through the word list and check if the word can be a head part or a tail part by comparing the first n and the last n characters of the target word when `n` is the length of the word in word list. If the word can be a head part, we put it in `head_list` at the index number `n`. Likewise, If the word can be a tail part, we put it in `tail_list` at the index number `n`.

    for word in word_list :
        word_length = len(word)

        if(word_length > target_length):
            continue
        
        if(word == target[0:word_length]):
            head_list[word_length] = word

        if(word == target[target_length - word_length: target_length]):
            tail_list[word_length] = word

By this method, we know which word that has specific length can be a head part or a tail part. For example, we can get the head word with length 3 by access `head_list` at index number 3. If the value gotten is `False`, it means our desired word does not exist.

After that, we iterate through `head_list`. If the element in each iteration is not `False`, it means this iteration might be the answer. The current index of iteration represents the length of the word, so what we need to do is checking if there is a tail word that can fit the head word by get the value of `tail_list` at the index which is the result of the length of target word subtract by the current index of the iteration. If the value gotten from `tail_list` is not `False`, we have a pair.

    for head_index in range(len(head_list)):

        head = head_list[head_index]

        if(head == False):
            continue

        tail = tail_list[target_length - head_index]
        
        if(tail != False and tail != head):
            is_found = True
            print((head, tail))