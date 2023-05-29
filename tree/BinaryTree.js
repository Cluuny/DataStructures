export class BinaryTree {
  constructor(root) {
    if (!root) {
      throw new Error("The tree must have a root!");
    }
    this.root = root;
    this.tree = new Map().set(root, new Map());
  }
  _parentExits(parent) {
    return this.tree.has(parent)
  }
  insertNode(parent, childValue, distance = 0) {
    let nodeChilds = this.tree.get(parent);
    if (!this._parentExits(parent)) {
      throw new Error("Unexpected error, the parent node don't exist");
    } else if (this.tree.has(childValue)) {
      throw new Error("Unexpected error, the child node already exist");
    } else if (nodeChilds.size > 1) {
      throw new Error("Unexpected error, the parent have 2 child's");
    } else {
      this.tree.set(childValue, new Map())
      nodeChilds.set(childValue, distance);
    }
    return true
  }
  exists(node) {
    return this.tree.has(node)
  }
  findShortestPathDFS(origin, destination) {
    const path = [];
    const visited = new Set();

    const dfs = (node) => {
      visited.add(node);

      // Si hemos llegado al destino, agregamos el nodo al camino y terminamos la recursión
      if (node === destination) {
        path.push(node);
        return true;
      }

      const childNodes = this.tree.get(node);

      // Si el nodo actual no tiene hijos, terminamos la recursión
      if (!childNodes || childNodes.size === 0) {
        return false;
      }

      // Recorremos los hijos en orden izquierdo - raíz - derecho
      for (const childNode of childNodes.keys()) {
        if (!visited.has(childNode)) {
          // Realizamos la llamada recursiva al siguiente nodo
          const found = dfs(childNode);
          if (found) {
            // Si se encontró el destino en el subárbol, agregamos el nodo actual al camino
            path.push(node);
            return true;
          }
        }
      }

      return false;
    };

    // Llamamos a la función DFS desde el nodo origen
    dfs(origin);

    // Invertimos el orden del camino para que sea desde el origen hasta el destino
    path.reverse();

    return path;
  }
  updateNodeValue(node, newValue) {
    if (!this.exists(node)) {
      throw new Error("Node does not exist in the tree.");
    }

    // Update the value of the node
    this.tree.set(newValue, this.tree.get(node));
    this.tree.delete(node);

    // Update the child nodes if necessary
    for (const [parent, children] of this.tree.entries()) {
      if (children.has(node)) {
        const distance = children.get(node);
        children.set(newValue, distance);
        children.delete(node);
      }
    }

    return true;
  }
  deleteNode(node) {
    if (!this.exists(node)) {
      throw new Error("Node does not exist in the tree.");
    }

    const children = this.tree.get(node);
    if (children.size > 0) {
      for (const child of children.keys()) {
        this.deleteNode(child);
      }
    }

    this.tree.delete(node);

    return true;
  }
}

