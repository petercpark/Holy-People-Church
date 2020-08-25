import os
os.chdir(r'F:\power990\Documents\Holy People Church\Holy-People-Church\sermons\test')

for file in os.listdir():
    src = file
    dst = file[0:10] + ".mp3"
    print(dst)
    os.rename(src, dst)
