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

After that, we iterate through `head_list`. If the element in each iteration is not `False`, it means this iteration might be the answer. The current index of iteration represents the length of the word, so what we need to do is checking if there is a tail word that can fit the head word by get the value of `tail_list` at the index which is the difference of the length of the target word and the current index of the iteration. If the value gotten from `tail_list` is not `False` and the head word is not the same word as tail word, we have a pair.

    for head_index in range(len(head_list)):

        head = head_list[head_index]

        if(head == False):
            continue

        tail = tail_list[target_length - head_index]
        
        if(tail != False and tail != head):
            is_found = True
            print((head, tail))

## **Complexity Analysis**

### **Time Complexity**

In time complexity analysis, we focus on two loops in the function, and let `n` refers to the length of word list and `m` refers to the length of the target string.

    for word in word_list :
        word_length = len(word)

        if(word_length > target_length):
            continue
        
        if(word == target[0:word_length]):
            head_list[word_length] = word

        if(word == target[target_length - word_length: target_length]):
            tail_list[word_length] = word

In the first loop, we iterates through the word list which has length `n`, and in each loop, we do a string comparison with the target word which has length `m`. *Thus, the time complexity of this loop is `O(nm)`.*

    for head_index in range(len(head_list)):

        head = head_list[head_index]

        if(head == False):
            continue

        tail = tail_list[target_length - head_index]
        
        if(tail != False and tail != head):
            is_found = True
            print((head, tail))

In the second loop, we iterate through `head_list` which has length `n`, and in each loop, we do a string comparison with the tail word which is a string with a length smaller than or equal to `m`. *Thus, the time complexity of this loop is `O(nm)`.*

Finally, we sum the time complexity of each loop. The answer is `O(nm) + O(nm)`.

> ***Therefore, the time complexity of this function is `O(nm)`.***

### **Space Complexity**

In space complexity analysis, we focus on two arrays, and let `m` refers to the length of the target string.

    target_length = len(target)

    head_list = [False] * (target_length + 1)
    tail_list = [False] * (target_length + 1)

Both `head_list` and `tail_list` has the length `m + 1`.

    for word in word_list :
        word_length = len(word)

        if(word_length > target_length):
            continue
        
        if(word == target[0:word_length]):
            head_list[word_length] = word

        if(word == target[target_length - word_length: target_length]):
            tail_list[word_length] = word

In the loop, we try to fill `head_list` and `tail_list`, but we ignore the word in word list which has length larger than `m`. *Thus, the space complexity of eace array is `O((m+1)(m))` or `O(m^2)`*

So, the space complexity of this function is sum of both array's space complexity which is `O(m^2) + O(m^2)`.

> ***Therefore, the space complexity of this function is `O(m^2)`.***
