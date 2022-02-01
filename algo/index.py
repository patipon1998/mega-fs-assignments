def solve(word_list, target):

    target_length = len(target)

    head_list = [False] * (target_length + 1)
    tail_list = [False] * (target_length + 1)

    for word in word_list :
        word_length = len(word)

        if(word_length > target_length):
            continue
        
        if(word == target[0:word_length]):
            head_list[word_length] = word

        if(word == target[target_length - word_length: target_length]):
            tail_list[word_length] = word

    is_found = False

    for head_index in range(len(head_list)):

        head = head_list[head_index]

        if(head == False):
            continue

        tail = tail_list[target_length - head_index]
        
        if(tail != False and tail != head):
            is_found = True
            print((head, tail))

    if(is_found != True):
        print("None")

word_list = input("Input your word list by type multiple words seperated by whitespace. e.g.; 'ab cd ef'\n>>> ").split()
target = input("Input your target word.\n>>> ")

solve(word_list, target)