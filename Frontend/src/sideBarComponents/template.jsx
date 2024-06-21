import React from "react";

const EmailTemplate = () => {
  return (
    <>
      <div className="py-4 flex">
        <div
          className=" border bg-white px-4 py-4 mx-6"
          style={{ width: "40rem" }}
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-bold ">New Template</h1>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Folder:
                </label>
                <button className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                  Browse
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tags:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Owner:
              </label>
              <input
                type="text"
                value="Zain Ishfaq (You)"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                style={{ width: "34rem" }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Body:
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                style={{ width: "34rem", height: "24rem" }}
              ></textarea>
            </div>
          </div>
        </div>

        {/* second div  */}
        <div className="bg-white" style={{width:"35rem"}}>
          <div className="flex flex-col border-gray-300 ">
            <div className="space-y-4 px-4 ">
              <h2 className="text-xl font-bold py-4">Template Preview</h2>
              <div className="border border-gray-300 rounded-md  px-4 p-4" style={{width:"30rem"}}>
                <p className="text-gray-700">
                  To: Example Contact &lt;example@google.com&gt;
                </p>
                <p className="text-gray-700">Subject:</p>
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <p>--</p>
                  <p>Zain Ishfaq</p>
                </div>
              </div>
              <button className="w-full p-2 bg-blue-500 text-white rounded-md">
                Send Test Email to Me
              </button>
            </div>
            <div className="flex justify-end mt-6 space-x-4 px-5">
              <button className="px-6 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default EmailTemplate;
