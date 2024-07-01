import EmailList from "../../model/EmailList/index.js";


export const createEmailList = async (req, res) => {
  const { Listname, emails, userId } = req.body; 
  try {
    const emailLists = emails.map(email => ({ ...email, Listname, userId }));
    
    const createdEmailLists = await EmailList.insertMany(emailLists);
    res.json(createdEmailLists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


export const getEmailLists = async (req, res) => {
  try {
    // Extracting filter parameters from request query
    const {
      Listname, industry, country, city, name, timezone,
      totalYearsOfExperience, timeInCurrentRole, sequence,
      lastActivity, company
    } = req.query;

    // Constructing filter object based on provided parameters
    const filter = {};
    if (Listname) filter.Listname = Listname;
    if (industry) filter.industry = industry;
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (name) filter.name = name;
    if (timezone) filter.timezone = timezone;
    if (totalYearsOfExperience) filter.totalYearsOfExperience = totalYearsOfExperience;
    if (timeInCurrentRole) filter.timeInCurrentRole = timeInCurrentRole;
    if (sequence) filter.sequence = sequence;
    if (lastActivity) filter.lastActivity = new Date(lastActivity);
    if (company) filter.company = company;

    // Retrieving email lists based on the constructed filter
    const emailLists = await EmailList.find(filter);

    res.json(emailLists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getUniqueCompanies = async (req, res) => {
  try {
    const companies = await EmailList.distinct('company');
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
