const { db } = require('../services');

class Database {
  constructor() {
    this.db = db;
  }

  getQueryParameters() {
    let [namesArr, valuesArr]  = [[], []];
    Object.keys(this.columnData).forEach((key, index) => {
      if (this.columnData[key] !== undefined) {
        namesArr.push(key);
        valuesArr.push(this.columnData[key]);
      }
    });
    const valueIndex = namesArr.map((key, index) => `$${index+1}`);
    return [namesArr, valuesArr, valueIndex];
  }

  async getFromDB() {
    const [namesArr, valuesArr, valueIndex] = this.getQueryParameters();
    const equityArr = namesArr.map((name, index) => `${name} = ${valueIndex[index]}`);
    const equity = equityArr.join(" AND ");
    const query = `SELECT * FROM public.${this.tableName} ${equity ? "WHERE " + equity : ''}`
    try {
      const res = await this.db.query(query, valuesArr);
      return { success: true, data: res };
    } catch(err) {
      console.log(`error while getting from ${this.tableName}: ${err}`);
      throw "Sorry, something went wrong. Please try again later."
    }
  }

  async insertIntoDB() {
    const [namesArr, valuesArr, valueIndex] = this.getQueryParameters();
    const [names, indexes] = [namesArr.join(', '), valueIndex.join(', ')];
    const query = `INSERT INTO public.${this.tableName} (${names}) VALUES (${indexes}) RETURNING ID`;
    try {
      const res = await this.db.query(query, valuesArr);
      return { success: true, insertId: res.rows[0].id };
    } catch(err) {
      console.log(`error while inserting to ${this.tableName}: ${err}`);
      if (err.code === "23505") {
        throw "Sorry, this email already exists.";
      } else {
        throw "Sorry, something went wrong. Please try again later."
      }
    }
  }

  async updateInDB() {
    const [namesArr, valuesArr, valueIndex] = this.getQueryParameters();
    const equityArr = namesArr.map((name, index) => `${name} = ${valueIndex[index]}`);
    const equity = equityArr.join(", ");
    const query = `UPDATE public.${this.tableName} SET ${equity} WHERE id = ${this.columnData.id} RETURNING *`;
    try {
      const res = await this.db.query(query, valuesArr);
      return { success: true, data: res };
    } catch(err) {
      console.log(`error while updating ${this.tableName}: ${err}`);
      throw "Sorry, something went wrong. Please try again later.";
    }
  }

  deleteFromDB() {
    // TODO
  }
}

module.exports = Database;