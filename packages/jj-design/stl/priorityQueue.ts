type CompareFn<T> = (a: T, b: T) => boolean;

export class PriorityQueue<Type> {
  container: Array<Type>;
  compare: CompareFn<Type>;
  /**
   *
   * @param compare default is max root heap
   */
  constructor(compare: CompareFn<Type>) {
    this.container = [];
    this.compare = compare;
  }

  insert(data) {
    const { compare, container } = this;

    container.push(data);
    let index = container.length - 1;
    // shift up
    while (index) {
      let parent = Math.floor((index - 1) / 2);
      if (!compare(container[index], container[parent])) {
        return;
      }
      // swap
      [container[parent], container[index]] = [container[index], container[parent]];
      index = parent;
    }
  }

  top() {
    if (this.container.length) return this.container[0];
    return null;
  }

  /**
   * pop the top item and shift down
   */
  pop() {
    if (this.container.length) {
      const result = this.container[0];
      const last = this.container.pop();
      this.container[0] = last!;
      let index = 0;

      while (true) {
        let leftIndex = 2 * index + 1;
        let rightIndex = 2 * index + 2;
        let nextIndex = index;
        if (
          this.container[leftIndex] !== undefined &&
          this.compare(this.container[leftIndex], this.container[nextIndex])
        ) {
          nextIndex = leftIndex;
        }
        if (
          this.container[rightIndex] !== undefined &&
          this.compare(this.container[rightIndex], this.container[nextIndex])
        ) {
          nextIndex = rightIndex;
        }
        [this.container[index], this.container[nextIndex]] = [
          this.container[nextIndex],
          this.container[index]
        ];
        if (nextIndex === index) break;
        index = nextIndex;
      }
      return result;
    }
    return null;
  }
}
