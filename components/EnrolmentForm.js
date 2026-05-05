const studentSubjects = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Science",
  "English",
  "Hindi",
  "Sanskrit",
  "Urdu",
  "French",
  "German",
  "SST",
  "Social Science",
  "History",
  "Geography",
  "Civics",
  "Political Science",
  "Economics",
  "Computer",
  "Computer Science",
  "Information Technology",
  "Artificial Intelligence",
  "Accountancy",
  "Business Studies",
  "Commerce",
  "Entrepreneurship",
  "Statistics",
  "Psychology",
  "Sociology",
  "Home Science",
  "Environmental Science",
  "General Knowledge",
  "Moral Science",
  "Drawing",
  "Art and Craft",
  "Music",
  "Physical Education",
  "EVS",
  "Olympiad Preparation",
  "NTSE Preparation",
  "CUET Preparation",
  "JEE Foundation",
  "NEET Foundation"
];
const classes = Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`);
const subjectOptions = studentSubjects.join("|");

const config = {
  page: {
    cardClassName: "lead-form-card",
    titleId: "leadFormTitle",
    switchId: "leadFormSwitch",
    studentPanelId: "studentFormPanel",
    teacherPanelId: "teacherFormPanel",
    studentFormId: "leadForm",
    teacherFormId: "teacherForm",
    studentSubmitId: "submitBtn",
    teacherSubmitId: "teacherSubmitBtn",
    studentCheckClass: "",
    teacherCheckClass: "teacher-check-pill",
    studentErrors: {
      name: "err-name",
      class: "err-class",
      board: "err-board",
      subject: "err-subject",
      mode: "err-mode",
      time: "err-time",
      phone: "err-phone",
    },
    teacherErrors: {
      name: "teacher-err-name",
      subject: "teacher-err-subject",
      phone: "teacher-err-phone",
    },
  },
  popup: {
    cardClassName: "lead-form-card modal-lead-form-card",
    titleId: "popupLeadFormTitle",
    switchId: "popupLeadFormSwitch",
    studentPanelId: "popupStudentFormPanel",
    teacherPanelId: "popupTeacherFormPanel",
    studentFormId: "popupLeadForm",
    teacherFormId: "popupTeacherForm",
    studentSubmitId: "popupSubmitBtn",
    teacherSubmitId: "popupTeacherSubmitBtn",
    studentCheckClass: "popup-check-pill",
    teacherCheckClass: "popup-teacher-check-pill",
    studentErrors: {
      name: "popup-err-name",
      class: "popup-err-class",
      board: "popup-err-board",
      subject: "popup-err-subject",
      mode: "popup-err-mode",
      time: "popup-err-time",
      phone: "popup-err-phone",
    },
    teacherErrors: {
      name: "popup-teacher-err-name",
      subject: "popup-teacher-err-subject",
      phone: "popup-teacher-err-phone",
    },
  },
};

export default function EnrolmentForm({ variant = "page" }) {
  const ids = config[variant] || config.page;

  return (
    <div className={ids.cardClassName}>
      <h4 id={ids.titleId}><i className="fas fa-graduation-cap"></i> Enrolment Form</h4>
      <div className="lead-form-switch" id={ids.switchId}>
        <button type="button" className="form-switch-btn active" data-form-type="student">Register as Student</button>
        <button type="button" className="form-switch-btn" data-form-type="teacher">Register as Teacher</button>
      </div>

      <div className="form-panel active" id={ids.studentPanelId}>
        <form className="lead-form" id={ids.studentFormId}>
          <div className="form-group">
            <label>Student's Full Name *</label>
            <div className="input-wrap"><i className="fas fa-user"></i><input type="text" name="name" placeholder="e.g. Rahul Sharma" required /></div>
            <span className="field-error" id={ids.studentErrors.name}></span>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Class *</label>
              <div className="class-picker" data-class-picker>
                <div className="input-wrap class-entry-wrap" data-class-trigger>
                  <i className="fas fa-layer-group"></i>
                  <span data-class-placeholder className="class-placeholder">Select class</span>
                  <i className="fas fa-chevron-down class-arrow"></i>
                </div>
                <div className="class-suggestions" data-class-suggestions>
                  {[...classes, 'Other'].map(cls => (
                    <button type="button" className="class-suggestion" data-class-value={cls} key={cls}>
                      <span className="suggestion-label">{cls}</span>
                      <span className="suggestion-tick"><i className="fas fa-plus"></i></span>
                    </button>
                  ))}
                </div>
                <div className="class-other-wrap" data-class-other-wrap>
                  <input type="text" data-class-other-input placeholder="e.g. Pre-School, Class 13..." autoComplete="off" />
                </div>
                <div data-selected-class></div>
              </div>
              <span className="field-error" id={ids.studentErrors.class}></span>
            </div>
            <div className="form-group">
              <label>Board *</label>
              <div className="input-wrap"><i className="fas fa-school"></i>
                <select name="board" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>CBSE</option><option>ICSE</option><option>State Board</option><option>Other</option>
                </select>
              </div>
              <span className="field-error" id={ids.studentErrors.board}></span>
            </div>
          </div>
          <div className="form-group">
            <label>Subject(s) Needed *</label>
            <div className="subject-picker" data-subject-picker data-subjects={subjectOptions}>
              <div className="input-wrap subject-entry-wrap">
                <i className="fas fa-book"></i>
                <input
                  type="text"
                  name="subjectEntry"
                  placeholder="Type or select subjects"
                  autoComplete="off"
                  data-subject-input
                />
              </div>
              <div className="subject-suggestions" data-subject-suggestions></div>
              <div className="selected-subjects" data-selected-subjects></div>
            </div>
            <span className="field-error" id={ids.studentErrors.subject}></span>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Mode *</label>
              <div className="input-wrap"><i className="fas fa-sliders-h"></i>
                <select name="mode" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Individual &mdash; Online</option>
                  <option>Individual &mdash; Offline</option>
                  <option>Group &mdash; Online</option>
                  <option>Group &mdash; Offline</option>
                </select>
              </div>
              <span className="field-error" id={ids.studentErrors.mode}></span>
            </div>
            <div className="form-group">
              <label>Preferred Time *</label>
              <div className="input-wrap"><i className="fas fa-clock"></i>
                <select name="time" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Morning (7-10 AM)</option>
                  <option>Afternoon (12-3 PM)</option>
                  <option>Evening (4-7 PM)</option>
                  <option>Night (7-9 PM)</option>
                </select>
              </div>
              <span className="field-error" id={ids.studentErrors.time}></span>
            </div>
          </div>
          <div className="form-group">
            <label>Parent's WhatsApp Number *</label>
            <div className="input-wrap"><i className="fab fa-whatsapp"></i><input type="tel" name="phone" placeholder="10-digit mobile number" maxLength="10" required pattern="[0-9]{10}" /></div>
            <span className="field-error" id={ids.studentErrors.phone}></span>
          </div>
          <div className="form-group">
            <label>City / Area</label>
            <div className="input-wrap"><i className="fas fa-map-marker-alt"></i><input type="text" name="city" placeholder="e.g. Lucknow, Gomti Nagar" /></div>
          </div>
          <div className="form-group">
            <label>Additional Message</label>
            <div className="input-wrap textarea-wrap"><i className="fas fa-comment-alt"></i><textarea name="message" rows="3" placeholder="Any specific requirements or questions..."></textarea></div>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-xl ripple" id={ids.studentSubmitId}>
            <i className="fab fa-whatsapp"></i> Book FREE Demo on WhatsApp
          </button>
          <p className="form-note"><i className="fas fa-shield-alt"></i> 100% confidential. We'll call within 30 mins.</p>
        </form>
      </div>

      <div className="form-panel" id={ids.teacherPanelId}>
        <form className="lead-form" id={ids.teacherFormId}>
          <div className="form-group">
            <label>Teacher's Full Name *</label>
            <div className="input-wrap"><i className="fas fa-user-tie"></i><input type="text" name="name" placeholder="e.g. Anjali Singh" required /></div>
            <span className="field-error" id={ids.teacherErrors.name}></span>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Highest Qualification *</label>
              <div className="input-wrap"><i className="fas fa-graduation-cap"></i><input type="text" name="qualification" placeholder="e.g. M.Sc Maths, B.Ed" required /></div>
            </div>
            <div className="form-group">
              <label>Teaching Experience *</label>
              <div className="input-wrap"><i className="fas fa-briefcase"></i>
                <select name="experience" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Subjects You Can Teach *</label>
            <div className="subject-picker" data-subject-picker data-subjects={subjectOptions}>
              <div className="input-wrap subject-entry-wrap">
                <i className="fas fa-book-open"></i>
                <input
                  type="text"
                  name="subjectEntry"
                  placeholder="Type or select subjects"
                  autoComplete="off"
                  data-subject-input
                />
              </div>
              <div className="subject-suggestions" data-subject-suggestions></div>
              <div className="selected-subjects" data-selected-subjects></div>
            </div>
            <span className="field-error" id={ids.teacherErrors.subject}></span>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Preferred Mode *</label>
              <div className="input-wrap"><i className="fas fa-sliders-h"></i>
                <select name="mode" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Offline (Home Visit)</option>
                  <option>Online</option>
                  <option>Both Online & Offline</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Available Time Slot *</label>
              <div className="input-wrap"><i className="fas fa-clock"></i>
                <select name="time" required defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Morning (6-10 AM)</option>
                  <option>Afternoon (11 AM-4 PM)</option>
                  <option>Evening (4-8 PM)</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>WhatsApp Number *</label>
            <div className="input-wrap"><i className="fab fa-whatsapp"></i><input type="tel" name="phone" placeholder="10-digit mobile number" maxLength="10" required pattern="[0-9]{10}" /></div>
            <span className="field-error" id={ids.teacherErrors.phone}></span>
          </div>
          <div className="form-group">
            <label>City / Area *</label>
            <div className="input-wrap"><i className="fas fa-map-marker-alt"></i><input type="text" name="city" placeholder="e.g. Delhi, Rohini" required /></div>
          </div>
          <div className="form-group">
            <label>Additional Message</label>
            <div className="input-wrap textarea-wrap"><i className="fas fa-comment-alt"></i><textarea name="message" rows="3" placeholder="Mention classes, boards, or preferred localities..."></textarea></div>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-xl ripple" id={ids.teacherSubmitId}>
            <i className="fab fa-whatsapp"></i> Apply as Teacher on WhatsApp
          </button>
          <p className="form-note"><i className="fas fa-user-check"></i> We verify every profile before onboarding.</p>
        </form>
      </div>
    </div>
  );
}
