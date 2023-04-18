const global = () => {
  const dateFormatter = (date) => {
    if (date) {
      const objDate = new Date(date);
      return objDate.toLocaleDateString("it-IT");
    }
    return;
  };

  return {
    dateFormatter,
  };
};

export default global;
