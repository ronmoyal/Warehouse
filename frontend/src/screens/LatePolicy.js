import { useAuthUser } from 'react-auth-kit';

const LatePolicy = () => {

    const auth = useAuthUser();

    return (
        <>
            {auth().role === 'Teacher' ? (
                <>
                    <div className="container">
                        <div className="latePolicyContainer">
                            <h2 className="latePolicyTitle">Late Policy for Teachers</h2>
                            <p>As a teacher, you are responsible for borrowing equipment only for the duration of your lecture. If you need to borrow equipment for a longer period, you must get approval from the admin.</p>
                            <p>If you fail to return the equipment on time or without approval, you may be subject to late fees or other penalties.</p>
                            <p>Please ensure that you return the equipment on or before the due date to avoid any issues.</p>
                            <p>If you need to extend the borrowing period, you must contact the admin at least 24 hours before the due date. The admin will review your request and may approve or deny it based on availability and other factors.</p>
                            <p>If you are approved for an extension, you will be responsible for any additional fees or penalties that may apply.</p>
                            <p>Please note that borrowing equipment for personal use is not allowed. The equipment is intended for use in lectures and other academic activities only.</p>
                            <hr />
                            <div className="highlight">
                                <p>Important Notice:</p>
                                <p>This late policy is subject to change. Teachers are advised to regularly check for updates and familiarize themselves with the latest version of the policy.</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="container">
                        <div className="latePolicyContainer">
                            <h2 className="latePolicyTitle">Late Policy for Students</h2>
                            <p>As a student, you are responsible for borrowing equipment for a maximum of one month. If you need to borrow equipment for a longer period, you must get approval from the admin.</p>
                            <p>If you fail to return the equipment on time or without approval, you may be subject to late fees or other penalties.</p>
                            <p>Please ensure that you return the equipment on or before the due date to avoid any issues.</p>
                            <p>If you need to extend the borrowing period, you must contact the admin at least 24 hours before the due date. The admin will review your request and may approve or deny it based on availability and other factors.</p>
                            <p>If you are approved for an extension, you will be responsible for any additional fees or penalties that may apply.</p>
                            <p>Please note that borrowing equipment for commercial or non-academic purposes is not allowed. The equipment is intended for use in academic activities only.</p>
                            <p>If you notice any damage or issues with the equipment, please report it to the admin immediately. You may be held responsible for any damage or loss that occurs while the equipment is in your possession.</p>
                            <hr />
                            <div className="highlight">
                                <p>Important Notice:</p>
                                <p>This late policy is subject to change. Students are advised to regularly check for updates and familiarize themselves with the latest version of the policy.</p>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

export default LatePolicy;
