TODO:

- Fix crazy memory error below
- Make fewer image requests
- Cache images on client browser
- Create low res placeholder images at build time?
- Paginate images
- Loading spinners
- Do not dispatch http call for image until its div is nearly in viewport

abort("Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value 67108864, (2) compile with -s ALLOW_MEMORY_GROWTH=1 which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with -s ABORTING_MALLOC=0 ")
