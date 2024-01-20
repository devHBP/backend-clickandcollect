const EMAIL_INVITE =  process.env.EMAIL_INVITE;
const PASSWORD_INVITE =  process.env.PASSWORD_INVITE;


const getEmailInvite = async (req, res) => {
    res.status(200).json({ EMAIL_INVITE });
};

const getPsswInvite = async (req, res) => {
    res.status(200).json({ PASSWORD_INVITE });
};

module.exports = {getEmailInvite, getPsswInvite};
