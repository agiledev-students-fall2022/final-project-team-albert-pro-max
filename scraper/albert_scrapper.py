import atexit
import math
import json
import random
import time
import pymongo
import requests

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException

from dotenv import dotenv_values

config = dotenv_values()

cxn = pymongo.MongoClient(config['MONGO_URI'], serverSelectionTimeoutMS=5000)
try:
    # verify the connection works by pinging the database
    # The ping command is cheap and does not require auth.
    cxn.admin.command('ping')
    db = cxn[config['MONGO_DBNAME']]  # store a reference to the database
    # if we get here, the connection worked!
    print(' *', 'Connected to MongoDB!')
except Exception as e:
    # the ping command failed, so the connection is not available.
    # render_template('error.html', error=e) # render the edit template
    print(' *', "Failed to connect to MongoDB at", config['MONGO_URI'])
    print('Database connection error:', e)  # debug

options = webdriver.ChromeOptions()

# options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument("--disable-extensions")
options.add_argument("--window-size=1920,1080")

# options.add_argument('--ignore-certificate-errors')
# options.add_argument('--allow-running-insecure-content')

# options.add_extension('Adblock-Plus_v1.12.4.crx')

prefs = {'profile.managed_default_content_settings.images': 2}
options.add_experimental_option('prefs', prefs)

driver = webdriver.Chrome(options=options)
driver.implicitly_wait(30)


def exit_handler():
    print("Program exiting, closing Chrome...")
    driver.close()


atexit.register(exit_handler)


class Scrapper:
    def __init__(self):
        self.start_time = None
        self.last_saved = 0
        self.artists = []

    def albert_course_search(self, school_name, department_name, department_a_id):
        driver.get("https://sis.nyu.edu/psc/csprod/EMPLOYEE/SA/c/NYU_SR.NYU_CLS_SRCH.GBL")
        driver.maximize_window()
        time.sleep(5)

        RECITATION_NAME_MAP = {
            "CSCI-UA": "Recitation",
            "DS-UA": "Laboratory",
            "MATH-UA": "Recitation",
            "CORE-UA": "Laboratory"
        }

        # Select Spring 2023
        term = WebDriverWait(driver, 5, 0.5).until(
            EC.element_to_be_clickable(
                (By.ID, 'NYU_CLS_WRK_NYU_SPRING$38$'))
        )
        term.click()

        # Select Term Yes
        spring_2023 = WebDriverWait(driver, 5, 0.5).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="NYU_CLS_WRK_NYU_SPRING$38$"]/option[3]'))
        )
        spring_2023.click()

        time.sleep(5)

        # Select School
        school = WebDriverWait(driver, 5, 0.5).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="NYU_CLS_WRK2_DESCR254$33$"]'))
        )
        school.click()

        # Select CAS
        school = WebDriverWait(driver, 5, 0.5).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="NYU_CLS_WRK2_DESCR254$33$"]/option[3]'))
        )
        school.click()

        time.sleep(5)

        # Select Department
        department = WebDriverWait(driver, 5, 0.5).until(
            EC.element_to_be_clickable(
                (By.ID, department_a_id))
        )
        department.click()

        time.sleep(5)

        courses = driver.find_elements(by=By.CSS_SELECTOR, value="div[id*='win0divSELECT_COURSE_row$']")

        print(f"----- Total Number of Courses: {len(courses)} -----\n")

        course_id_list = []

        for course in courses:
            course_title = course.find_element(by=By.CSS_SELECTOR, value="div.ps_box-htmlarea b").text
            if "\n" in course_title:
                course_title = course_title[:course_title.find("\n")].strip()

            department_code = course_title.split(" ")[0].strip()
            course_number = course_title.split(" ")[1].strip()
            course_name = " ".join(course_title.split(" ")[2:]).strip()

            if "more description for" in course.find_element(by=By.CSS_SELECTOR, value="div.ps-htmlarea").get_property("innerText"):
                course_description_p = course.find_element(by=By.CSS_SELECTOR, value="div[id*=fullDescription_] > p")

                hide_full_desc_a = course.find_element(by=By.CSS_SELECTOR, value="a[onclick*='hideFull']")
                driver.execute_script("""
                const element = arguments[0];
                element.parentNode.removeChild(element);
                """, hide_full_desc_a)
            else:
                course_description_p = course.find_element(by=By.CSS_SELECTOR, value="div.ps-htmlarea > span > p")

            course_description = course_description_p.get_property("innerText").strip()

            print(f"{'*' * 20}")
            print("Department Code:", department_code)
            print("Course Number:", course_number)
            print("Course Name:", course_name)
            print("Course Description:", course_description, "\n")

            course_sections = course.find_elements(by=By.CSS_SELECTOR, value="div[id*='win0divSELECT_CLASS_row$']")

            topic = ""
            for course_section in course_sections:
                topic_or_units_div = course_section.find_element(by=By.CSS_SELECTOR, value="table div")
                if "Topic: " in topic_or_units_div.text:
                    multi_topics = 1
                    topic = topic_or_units_div.find_element(by=By.TAG_NAME, value="b").text.replace("Topic: ", "").strip()
                    print(f"Topic: {topic}")
                else:
                    multi_topics = 0

                units = ""
                if " units" in topic_or_units_div.text:
                    units = topic_or_units_div.text.split(" | ")[1].strip().replace(" units", "").strip()
                    print(f"Units: {units}")

                fields = course_section.find_elements(by=By.CSS_SELECTOR, value="table div:nth-child(2) div")

                course_fields = {}

                for field in fields:
                    if ":" in field.text:
                        key = field.text.split(": ")[0].strip()
                        value = field.text.split(": ")[1].strip()
                        course_fields[key] = value
                        print(f"{key}: {value}")

                time_location_instructor_texts = course_section.find_element(by=By.CSS_SELECTOR, value="table > tbody > tr > td") \
                                                     .get_property("innerHTML") \
                                                     .split("<br>")[1:]

                time_room_instructor_text = ""
                for text in time_location_instructor_texts:
                    if " - " in text.strip():
                        time_room_instructor_text = text.strip()
                        break

                print()

                instructor = []
                if "with" in time_room_instructor_text:
                    instructor = time_room_instructor_text[time_room_instructor_text.find("with") + 4:].strip().split(";")
                    time_room_instructor_text = time_room_instructor_text[:time_room_instructor_text.find("with")].strip()

                building_room = ""
                if "at" in time_room_instructor_text:
                    building_room = time_room_instructor_text[time_room_instructor_text.find("at") + 2:].strip()
                    time_room_instructor_text = time_room_instructor_text[:time_room_instructor_text.find("at")].strip()

                days = ""
                times = ""
                if "AM" in time_room_instructor_text or "PM" in time_room_instructor_text:
                    day_time = time_room_instructor_text[time_room_instructor_text.rfind("2023") + 4:].strip()
                    print("Days/Times:", day_time)
                    days = day_time[:day_time.find(" ")].strip()
                    times = day_time[day_time.find(" ") + 1:].strip()

                print("Instructor:", instructor)
                print("Building Room:", building_room)
                print("Days:", days)
                print("Times:", times)

                if course_fields["Component"].strip() == RECITATION_NAME_MAP[department_code.strip()]:
                    recitation_dict = {
                        "lecture_id": course_id_list[-1],
                        "class_number": course_fields["Class#"].strip(),
                        "session": course_fields["Session"].strip(),
                        "section_number": course_fields["Section"].strip(),
                        "class_status": course_fields["Class Status"].strip(),
                        "instruction_mode": course_fields["Instruction Mode"].strip(),
                        "location": course_fields["Course Location"].strip(),
                        "component": course_fields["Component"].strip(),
                        "building_room": building_room.strip(),
                        "days": days.strip(),
                        "times": times.strip(),
                        "instructor": instructor,
                    }

                    inserted_id = db.recitations.insert_one(recitation_dict).inserted_id
                    print(f"\n[RECITATION] Inserted {course_fields['Component'].strip()} ID:", inserted_id)
                else:
                    course_dict = {
                        "school_name": school_name,
                        "department_name": department_name,
                        "department_code": department_code.strip(),
                        "course_number": course_number.strip(),
                        "course_name": course_name.strip(),
                        "course_description": course_description.strip(),
                        "units": units.strip(),
                        "class_number": course_fields["Class#"].strip(),
                        "session": course_fields["Session"].strip(),
                        "section_number": course_fields["Section"].strip(),
                        "class_status": course_fields["Class Status"].strip(),
                        "instruction_mode": course_fields["Instruction Mode"].strip(),
                        "location": course_fields["Course Location"].strip(),
                        "component": course_fields["Component"].strip(),
                        "building_room": building_room.strip(),
                        "days": days.strip(),
                        "times": times.strip(),
                        "instructor": instructor,
                        "multi_topics": multi_topics,
                        "topic": topic.strip()
                    }

                    inserted_id = db.courses.insert_one(course_dict).inserted_id
                    print(f"\n[COURSES] Inserted {course_fields['Component'].strip()} ID:", inserted_id)

                    course_id_list.append(inserted_id)

                print("------------------------------")


if __name__ == '__main__':
    scrapper = Scrapper()

    DEPARTMENT_NAME_A_ID_MAP = {
        "College Core Curriculum": "LINK1$12",
        "Computer Science": "LINK1$15",
        "Data Science": "LINK1$17",
        "Math": "LINK1$40"
    }

    SCHOOL_NAME = "College of Arts and Science"

    for department_name in DEPARTMENT_NAME_A_ID_MAP:
        scrapper.albert_course_search(school_name=SCHOOL_NAME, department_name=department_name, department_a_id=DEPARTMENT_NAME_A_ID_MAP[department_name])

    exit(1)
