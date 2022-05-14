import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <div className="footer-container">
        <div className="footer-info">Ⓒ CarHub 2022. All rights reserved.</div>
        <div className="footer-logo">
          <a href="https://github.com/NikitaYakovlev17">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
