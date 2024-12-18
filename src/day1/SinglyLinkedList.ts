export default class SinglyLinkedList<T> {
  public length: number;
  private head: Node<T> | null;
  private tail: Node<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  prepend(item: T): void {
    const new_node = new Node(item);
    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;
    } else {
      new_node.next = this.head;
    }
    this.head = new_node;
    this.length++;
  }
  insertAt(item: T, idx: number): void {}
  append(item: T): void {
    const new_node = new Node(item);
    if (!this.head) {
      this.head = new_node;
      this.tail = new_node;
    } else {
      if (this.tail) {
        this.tail.next = new_node;
      }
      this.tail = new_node;
    }
    this.length++;
  }
  remove(item: T): T | undefined {
    if (!this.head) return undefined;

    // Handle the Head case
    if (this.head.value === item) {
      let temp = this.head;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return temp.value;
    }

    let current = this.head;
    let previous: Node<T> | null = null;

    // Handle the General Case
    for (let i = 0; i < this.length - 1; i++) {
      // Find the Previous and Current Nodes
      if (current.next) {
        previous = current;
        current = current.next;
      } else {
        return undefined;
      }

      // If the current node value is the item
      if (current.value === item) {
        const temp = current;
        previous.next = current.next;
        this.length--;
        return temp.value;
      }
    }

    return undefined;
  }
  get(idx: number): T | undefined {
    if (!this.head) return undefined;
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      if (current.next) {
        current = current.next;
      }
    }
    return current.value;
  }
  removeAt(idx: number): T | undefined {
    if (!this.head) return undefined;
    if (idx < 0 || idx >= this.length) return undefined;
    if (idx === 0) {
      let temp = this.head;
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return temp.value;
    }

    let current = this.head;
    let previous: Node<T> | null = null;

    // Find the Previous and Current Nodes
    for (let i = 0; i < idx; i++) {
      if (current.next) {
        previous = current;
        current = current.next;
      } else {
        return undefined;
      }
    }

    // Remove the current Node.
    if (previous && current) {
      const temp = current;
      previous.next = current.next;

      // If its the tail
      if (!current.next) {
        this.tail = previous;
      }

      this.length--;
      return temp.value;
    }
    return undefined;
  }
}

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
