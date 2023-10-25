class Organization {
  constructor(root) {
    // Creating an object for all the different positions
    this.positions = {};

    // Adding all the positions recursively
    this.addRelatedPositions = (position) => {
      this.positions[position.getTitle()] = position;
      for (const p of position.getDirectReports()) {
        this.addRelatedPositions(p);
      }
    };

    this.addRelatedPositions(root);

    this.printOrganization = (position, prefix) => {
      let str = `${prefix}+-${position.toString()}\n`;
      for (const p of position.getDirectReports()) {
        str = str.concat(this.printOrganization(p, `${prefix}  `));
      }
      return str;
    };

    // Hire the given person as an employee in the position that has that title
    // Return the newly filled position or undefined if no position has that title
    this.hire = (person, title) => {
      if (!(title in this.positions)) return undefined;

      let position = this.positions[title];
      position.setEmployee(person);
      return position;
    };

    this.toString = () => this.printOrganization(root, "");
  }
}

export default Organization;
